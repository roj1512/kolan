export function PaginationButtons({
  author,
  page,
  pages,
}: {
  author?: string;
  page: number;
  pages: number;
}) {
  const getPageHref = (number: number) =>
    `?page=${number}${author ? `&author=${author}` : ""}`;

  return (
    <div class="flex flex-col items-center p-5">
      <ul class="flex gap-2.5">
        {(() => {
          const arr = new Array<number>();
          for (let i = page - 4; i < page; i++) arr.push(i);
          return arr
            .filter((v) => v > 0)
            .map((v) => (
              <li>
                <a
                  href={getPageHref(v)}
                  class="opacity-50 hover:text-kolan hover:opacity-100"
                >
                  {v}
                </a>
              </li>
            ));
        })()}
        <li class="text-kolan">
          <a>{page}</a>
        </li>
        {(() => {
          const arr = new Array<number>();
          for (let i = page + 1; i <= page + 4; i++) arr.push(i);
          return arr
            .filter((v) => v <= pages)
            .map((v) => (
              <li>
                <a
                  href={getPageHref(v)}
                  class="opacity-50 hover:text-kolan hover:opacity-100"
                >
                  {v}
                </a>
              </li>
            ));
        })()}
      </ul>
      <ul class="flex gap-2.5">
        {page - 1 > 1 && (
          <li>
            <a href="/" class="opacity-50 hover:text-kolan hover:opacity-100">
              « First
            </a>
          </li>
        )}
        {page != 1 && (
          <li>
            <a
              href={getPageHref(page - 1)}
              class="opacity-50 hover:text-kolan hover:opacity-100"
            >
              ‹ Previous
            </a>
          </li>
        )}
        {page != pages && (
          <li>
            <a
              href={getPageHref(page + 1)}
              class="opacity-50 hover:text-kolan hover:opacity-100"
            >
              Next ›
            </a>
          </li>
        )}
        {page + 1 < pages && (
          <li>
            <a
              href={getPageHref(pages)}
              class="opacity-50 hover:text-kolan hover:opacity-100"
            >
              Last »
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
