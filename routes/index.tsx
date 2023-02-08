import { ObjectId } from "mongo";
import { Handler, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { client, Collection } from "@/utilities/mongodb.ts";
import { Body } from "@/components/Body.tsx";
import { Definition, DefinitionProps } from "@/components/Definition.tsx";
import { PaginationButtons } from "@/components/PaginationButtons.tsx";
import { DEFINTIIONS_PER_PAGE } from "@/utilities/constants.ts";

export const handler: Handler = async (req, ctx) => {
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
      .collection(Collection.Definitions)
      .countDocuments({
        ...(q ? { term: exp } : {}),
        ...(author ? { author: new ObjectId(author) } : {}),
      })) / DEFINTIIONS_PER_PAGE,
  );
  const definitions = await client
    .database()
    .collection(Collection.Definitions)
    .aggregate([
      ...(q ? [{ $match: { term: exp } }] : []),
      ...(author ? [{ $match: { author: new ObjectId(author) } }] : []),
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      { $set: { authorId: "$author._id" } },
      {
        $set: {
          author: {
            $cond: {
              if: {
                $eq: ["$author._id", new ObjectId("000000000000000000000000")],
              },
              then: "Unknown",
              else: "$author.name",
            },
          },
        },
      },
      {
        $lookup: {
          from: Collection.Votes,
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$id", "$$id"] },
                    { $eq: ["$direction", "up"] },
                  ],
                },
              },
            },
            { $count: "count" },
          ],
          as: "upvotes",
        },
      },
      {
        $lookup: {
          from: Collection.Votes,
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$id", "$$id"] },
                    { $eq: ["$direction", "down"] },
                  ],
                },
              },
            },
            { $count: "count" },
          ],
          as: "downvotes",
        },
      },
      {
        $set: {
          upvotes: {
            $cond: {
              if: { $eq: [{ $size: "$upvotes" }, 0] },
              then: { count: 0 },
              else: { $arrayElemAt: ["$upvotes", 0] },
            },
          },
        },
      },
      {
        $set: {
          downvotes: {
            $cond: {
              if: { $eq: [{ $size: "$downvotes" }, 0] },
              then: { count: 0 },
              else: { $arrayElemAt: ["$downvotes", 0] },
            },
          },
        },
      },
      { $set: { upvotes: "$upvotes.count", downvotes: "$downvotes.count" } },
      { $sort: { createdAt: -1 } },
      { $skip: DEFINTIIONS_PER_PAGE * (page - 1) },
      { $limit: DEFINTIIONS_PER_PAGE },
    ])
    .toArray();
  return ctx.render({ page, author, pages, definitions });
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
        <title>Kolan Dictionary</title>
      </Head>
      <ul class="flex flex-col gap-10 w-full mx-auto max-w-xl">
        {definitions.map((v) => (
          <li>
            <Definition {...v} />
          </li>
        ))}
      </ul>
      {pages > 0
        ? <PaginationButtons author={author} page={page} pages={pages} />
        : (
          <p class="flex items-center gap-2.5">
            No results found.{" "}
            <a href="/" class="small-button">
              Reset Filter
            </a>
          </p>
        )}
    </Body>
  );
}
