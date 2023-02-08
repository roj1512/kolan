import Footer from "@/components/Footer.tsx";
import Header from "@/islands/Header.tsx";
import type { ComponentChildren } from "preact";

export function Body({ children }: { children?: ComponentChildren }) {
  return (
    <body dir="ltr" class="leading-6 text-fg bg-bg">
      <Header />
      <main class="p-5 min-h-[calc(100vh-10px)]">
        <div class="mx-auto w-full max-w-screen-lg">{children}</div>
      </main>
      <Footer />
      <div class="w-full bg-kolan sticky left-0 bottom-0 h-2.5"></div>
    </body>
  );
}
