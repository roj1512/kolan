/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import env from "@/env.ts";
import manifest from "@/fresh.gen.ts";
import twindConfig from "@/twind.config.ts";
import { client } from "@/utilities/mongodb.ts";

await client.connect(env.MONGODB_URI);

await start(manifest, { plugins: [twindPlugin(twindConfig)] });

// client.database()
//   .collection(VOTES)
//   .createIndexes(
//     {
//       indexes: [
//         { name: "wordaddr", key: { word: 1, addr: 1 }, unique: true },
//         { name: "wordauthor", key: { word: 1, author: 1 }, unique: true },
//       ],
//     },
//   );

// client
//   .database()
//   .collection(DEFINITIONS)
//   .createIndexes(
//     {
//       indexes: [{
//         name: "termauthor",
//         key: { term: 1, author: 1 },
//         unique: true,
//       }],
//     },
//   );
