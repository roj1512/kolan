import { useEffect, useState } from "preact/hooks";
import { Plus as PlusIcon } from "@/components/icons/Plus.tsx";

export default function Plus() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (location.pathname == "/submit") {
      [
        setActive(true),
      ];
    }
  }, []);

  return (
    <a
      {...(!active ? { href: "/submit" } : {})}
      class={`text-kolan ${active ? "opacity-50" : ""}`}
    >
      <PlusIcon />
    </a>
  );
}
