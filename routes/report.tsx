import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { ObjectId } from "mongo";
import { z } from "zod";
import { client, Collection } from "@/utilities/mongodb.ts";
import { Body } from "@/components/Body.tsx";
import { DefinitionProps } from "@/components/Definition.tsx";
import ReportSubmission from "@/islands/ReportSubmission.tsx";

const zReport = z.object({
  term: z.string(),
  text: z.string(),
});
export const handler: Handlers = {
  POST: async (req) => {
    const report = zReport.parse(await req.json());
    // do sth with report
    return new Response();
  },
  GET: async (req, ctx) => {
    const { searchParams } = new URL(req.url);
    const term = searchParams.get("term");
    if (term) {
      const definition = (
        await client
          .database()
          .collection(Collection.Definitions)
          .aggregate([
            { $match: { _id: new ObjectId(term) } },
            {
              $lookup: {
                from: "authors",
                localField: "author",
                foreignField: "_id",
                as: "author",
              },
            },
            { $unwind: "$author" },
            { $set: { author: "$author.name" } },
          ])
          .toArray()
      )[0];
      if (definition) {
        return ctx.render(definition);
      }
    }
    return Response.redirect(new URL("/", req.url));
  },
};

export default function Report({ data: data }: PageProps<DefinitionProps>) {
  return (
    <Body>
      <Head>
        <title>Kolan Dictionary | Submit a Report</title>
      </Head>
      <ReportSubmission {...data} />
    </Body>
  );
}
