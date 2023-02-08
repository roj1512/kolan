import { useState } from "preact/hooks";
import { Kolan } from "@/components/icons/Kolan.tsx";
import { Search } from "@/components/icons/Search.tsx";
import { X } from "@/components/icons/X.tsx";
import Plus from "@/islands/Plus.tsx";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  function search(q: string) {
    const params = new URLSearchParams(location.search);
    params.set("q", q);
    params.delete("page");
    location.replace(`/?${params.toString()}`);
  }
  return (
    <header
      class={`bg-fur px-4 py-[calc(1.5rem-3px)] sm:py-4 w-full sticky top-0 shadow-sm z-50 ${
        showSearch && "py-4"
      } `}
    >
      {showSearch && (
        <div class="mx-auto w-full max-w-screen-lg flex items-center justify-between gap-3 sm:hidden">
          <input
            class="input"
            placeholder="Search..."
            onChange={(e) => search(e.currentTarget.value)}
          />
          <button
            onClick={() => setShowSearch(!showSearch)}
            class="text-kolan focus:outline-none"
          >
            <X height="30" />
          </button>
        </div>
      )}
      <div
        class={`mx-auto w-full max-w-screen-lg items-center justify-between gap-3 ${
          showSearch ? "hidden sm:flex" : "flex"
        }`}
      >
        <a href="/" class="text-kolan">
          <Kolan />
        </a>
        <input
          class="input hidden sm:block"
          placeholder="Search..."
          onChange={(e) => search(e.currentTarget.value)}
        />
        <div class="flex gap-2.5">
          <button
            class="sm:hidden text-kolan focus:outline-none"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search />
          </button>
          <Plus />
        </div>
      </div>
    </header>
  );
}
