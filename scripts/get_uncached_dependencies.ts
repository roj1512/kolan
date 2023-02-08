// Workaround for https://github.com/denoland/fresh/issues/1021.
import importMap from "@/import_map.json" assert { type: "json" };

const { imports } = importMap;

const deps = [
  `${imports["$fresh/"]}src/runtime/main_dev.ts`,
  `${imports["$fresh/"]}src/runtime/main.ts`,
  `${imports["$fresh/"]}plugins/twind/main.ts`,
  `${imports["preact/"]}debug`,
  `${imports["preact/"]}deno/debug.js`,
  `${imports["preact/"]}deno/devtools.js`,
];

await Deno.stdout.write(new TextEncoder().encode(deps.join(" ")));
