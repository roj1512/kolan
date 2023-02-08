import { GitHub } from "@/components/icons/GitHub.tsx";

export default function Footer() {
  return (
    <footer class="bg-fur p-5 w-full shadow-sm">
      <div class="mx-auto w-full max-w-2xl flex items-center justify-between gap-5">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a href="#" class="link">
            KOLAN
          </a>
        </p>
        <ul class="flex items-center justify-center gap-2.5">
          <li>
            <a class="link" href="https://github.com/roj1512/kolan">
              <GitHub />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
