import { ObjectId } from "mongo";

export interface ReviewButtonsProps {
  _id: ObjectId;
}

export default function ReviewButtons({ _id }: ReviewButtonsProps) {
  return (
    <>
      <li class="grow w-full basis-0">
        <button
          onClick={async () => {
            await fetch(location.href, {
              method: "POST",
              body: JSON.stringify(["decline", _id.toString()]),
            });
            location.reload();
          }}
          class="flex items-center justify-center gap-2.5 border-morefur border-2  w-full border-r-0 p-2 rounded-l-xl"
        >
          Decline
        </button>
      </li>
      <li class="grow w-full basis-0">
        <button
          onClick={async () => {
            await fetch(location.href, {
              method: "POST",
              body: JSON.stringify(["approve", _id.toString()]),
            });
            location.reload();
          }}
          class="flex items-center justify-center gap-2.5 border-morefur border-2 p-2 h-full w-full rounded-r-xl"
        >
          Approve
        </button>
      </li>
    </>
  );
}
