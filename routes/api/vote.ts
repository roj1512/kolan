import { z } from "zod";
import { ObjectId } from "mongo";
import { Handler, Status } from "$fresh/server.ts";
import { zId } from "@/utilities/zod.ts";
import { client, Collection } from "@/utilities/mongodb.ts";
import { digestAddr } from "@/utilities/crypto.ts";

const zVote = z.object({
  id: zId,
  direction: z.string().regex(/^(up|down)$/),
});

export const handler: Handler = async (
  req,
  ctx,
) => {
  const { id, direction } = zVote.parse(await req.json());
  if (
    await client
      .database()
      .collection(Collection.Definitions)
      .countDocuments({ _id: new ObjectId(id) }) <= 0
  ) {
    return new Response(null, { status: Status.BadRequest });
  }
  const filter = {
    addr: await digestAddr(ctx.remoteAddr),
    id: new ObjectId(id),
  };
  const { upsertedCount, modifiedCount } = await client
    .database()
    .collection(Collection.Votes)
    .updateOne(
      filter,
      { $set: { direction }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true },
    );
  if (upsertedCount + modifiedCount > 0) {
    await client
      .database()
      .collection(Collection.Votes)
      .updateOne(filter, { $set: { updatedAt: new Date() } });
  }
  return Response.json(upsertedCount + modifiedCount != 0);
};
