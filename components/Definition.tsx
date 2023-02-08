import { ObjectId } from "mongo";
import { tw } from "twind";
import { marked, Renderer } from "marked";
import { timeAgo } from "time_ago";
import { Flag } from "@/components/icons/Flag.tsx";
import ReviewButtons from "@/islands/ReviewButtons.tsx";
import VoteButtons from "@/islands/VoteButtons.tsx";

export interface DefinitionProps {
  _id: ObjectId;
  term: string;
  author: string;
  authorId: ObjectId;
  definition: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
}

const renderer = new Renderer();

renderer.link = (href: string, title: string | null, text: string) => {
  return `<a class="${tw`link`}" href="${href}"${
    title ? ` title="${title}"` : ""
  }>${text}</a>`;
};

export function Definition({
  _id,
  term,
  definition,
  author,
  upvotes,
  downvotes,
  authorId,
  createdAt,
  buttons = "vote",
}: DefinitionProps & { buttons?: "vote" | "review" }) {
  return (
    <div class="bg-fur p-5 flex flex-col gap-5 rounded-xl shadow-sm">
      <div class="flex justify-between gap-2.5">
        <h2 class="text-3xl">
          <a
            class="link font-extrabold"
            href={`?q=${encodeURIComponent(term)}`}
          >
            {term}
          </a>
        </h2>
        <p class="text-xs opacity-75">{timeAgo(createdAt)}</p>
      </div>
      <p
        class="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: marked.parseInline(definition, { renderer }),
        }}
      >
      </p>
      <p class="mt-5">
        By{" "}
        <a class="link" href={`/?author=${authorId.toString()}`}>
          {author}
        </a>
      </p>
      <ul class="flex gap-5 justify-between">
        {buttons == "vote"
          ? (
            <>
              <li>
                <ul class="flex">
                  <VoteButtons
                    _id={_id.toString()}
                    upvotes={upvotes}
                    downvotes={downvotes}
                  />
                </ul>
              </li>
              <li>
                <a
                  class="flex items-center justify-center gap-2.5 border-morefur border-2 p-2 rounded-xl"
                  href={`/report?term=${_id.toString()}`}
                >
                  <Flag /> Report
                </a>
              </li>
            </>
          )
          : (
            <>
              <li class="w-full">
                <ul class="flex">
                  <ReviewButtons _id={_id} />
                </ul>
              </li>
            </>
          )}
      </ul>
    </div>
  );
}
