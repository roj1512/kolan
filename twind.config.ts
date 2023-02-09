import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  hash: true,
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        fur: "var(--fur)",
        kolan: "var(--kolan)",
        morefur: "var(--morefur)",
      },
    },
  },
  plugins: {
    link: "text-kolan font-bold cursor-pointer",
    active: "bg-morefur text-kolan",
    input:
      "bg-morefur px-3 py-2 rounded-xl w-full disabled:opacity-75 focus:outline-none",
    button:
      "uppercase w-full px-3 py-2 flex items-center gap-2.5 justify-center bg-kolan rounded-xl text-white disabled:cursor-default disabled:opacity-75 focus:outline-none",
    "small-button":
      "uppercase text-kolan py-1 px-2 rounded-lg hover:bg-fur text-sm select-none",
  },
} as Options;
