import { ObjectId } from "mongo";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { z } from "zod";
import { client, Collection } from "@/utilities/mongodb.ts";
import { Body } from "@/components/Body.tsx";
import { Definition, DefinitionProps } from "@/components/Definition.tsx";
import { PaginationButtons } from "@/components/PaginationButtons.tsx";
import { DEFINTIIONS_PER_PAGE } from "@/utilities/constants.ts";
import { zId } from "@/utilities/zod.ts";

export const handler: Handlers<unknown, { id: string; reviewer: boolean }> = {
  POST: async (req, ctx) => {
    const [action, id] = await z
      .tuple([z.literal("approve").or(z.literal("decline")), zId])
      .parseAsync(await req.json());
    const filter = { _id: new ObjectId(id) };
    const { modifiedCount } = await client
      .database()
      .collection(Collection.Submissions)
      .updateOne(filter, {
        $set: {
          state: "reviewed",
          declined: action == "decline",
          reviewer: new ObjectId(ctx.state.id),
          reviewedAt: new Date(),
        },
      });
    if (action == "approve") {
      const submission = await client
        .database()
        .collection(Collection.Submissions)
        .findOne(filter);
      if (submission) {
        await client
          .database()
          .collection(Collection.Definitions)
          .insertOne({
            author: new ObjectId("000000000000000000000000"),
            term: submission.term,
            definition: submission.definition,
            createdAt: new Date(),
          });
      }
    }
    return Response.json(modifiedCount != 0);
  },
  GET: async (req, ctx) => {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const q = searchParams.get("q");
    const exp = new RegExp(
      `^${(q || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      "i",
    );
    const author = searchParams.get("author");
    const pages = Math.ceil(
      (await client
        .database()
        .collection(Collection.Submissions)
        .countDocuments({
          state: { $ne: "reviewed" },
          ...(q ? { term: exp } : {}),
          ...(author ? { author: new ObjectId(author) } : {}),
        })) / DEFINTIIONS_PER_PAGE,
    );
    const definitions = await client
      .database()
      .collection(Collection.Submissions)
      .aggregate([
        { $match: { state: { $ne: "reviewed" } } },
        ...(author ? [{ $match: { author: new ObjectId(author) } }] : []),
        ...(q ? [{ $match: { term: exp } }] : []),
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $set: {
            authorId: {
              $cond: {
                if: { $eq: ["$author", []] },
                then: new ObjectId("000000000000000000000000"),
                else: "$author._id",
              },
            },
          },
        },
        {
          $set: {
            author: {
              $cond: {
                if: { $eq: ["$author", []] },
                then: "Unknown",
                else: "$author.name",
              },
            },
          },
        },
        { $unwind: "$authorId" },
        { $unwind: "$author" },
        { $sort: { createdAt: -1 } },
        { $skip: DEFINTIIONS_PER_PAGE * (page - 1) },
        { $limit: DEFINTIIONS_PER_PAGE },
      ])
      .toArray();
    return ctx.render({ page, author, pages, definitions });
  },
};

export default function Index({
  data: { page, pages, definitions, author },
}: PageProps<{
  page: number;
  pages: number;
  author?: string;
  definitions: DefinitionProps[];
}>) {
  return (
    <Body>
      <Head>
        <title>Kolan Dictionary | Submissions</title>
      </Head>
      <ul class="flex flex-col gap-10 w-full max-w-xl mx-auto">
        {definitions.map((v) => (
          <li>
            <Definition buttons="review" {...v} />
          </li>
        ))}
      </ul>
      {pages > 0
        ? <PaginationButtons author={author} page={page} pages={pages} />
        : (
          <p class="flex items-center gap-2.5">
            No results found.
            <a href="/" class="small-button">
              Reset Filter
            </a>
          </p>
        )}
    </Body>
  );
}
