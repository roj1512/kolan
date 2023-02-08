import { Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { z } from "zod";
import { client, Collection } from "@/utilities/mongodb.ts";
import { zDefinition, zTerm } from "@/utilities/zod.ts";
import { Body } from "@/components/Body.tsx";
import DefinitionSubmission from "@/islands/DefinitionSubmission.tsx";

const zSubmission = z.object({
  term: zTerm,
  definition: zDefinition,
});

export const handler: Handlers = {
  POST: async (req) => {
    const submission = zSubmission.parse(await req.json());
    await client
      .database()
      .collection(Collection.Submissions)
      .insertOne({
        ...submission,
        createdAt: new Date(),
      });
    return new Response();
  },
  GET: (_req, ctx) => {
    return ctx.render(ctx.state.name);
  },
};

export default function Submit() {
  return (
    <Body>
      <Head>
        <title>Kolan Dictionary | Submit a Definition</title>
      </Head>
      <DefinitionSubmission />
    </Body>
  );
}
