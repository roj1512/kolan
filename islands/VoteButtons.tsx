import { useEffect, useState } from "preact/hooks";
import { Vote } from "@/components/icons/Vote.tsx";

export interface VoteButtonsProps {
  _id: string;
  upvotes: number;
  downvotes: number;
}

export default function VoteButtons(
  { _id, upvotes: upvotes_, downvotes: downvotes_ }: VoteButtonsProps,
) {
  const [direction, setDirection] = useState<"up" | "down">();
  const [upvotes, setUpvotes] = useState(upvotes_);
  const [downvotes, setDownvotes] = useState(downvotes_);

  useEffect(() => {
    const direction = localStorage.getItem(`vote_${_id}`);
    if (direction && ["up", "down"].includes(direction)) {
      setDirection(direction as "up" | "down");
    }
  }, []);

  useEffect(() => {
    if (direction) {
      localStorage.setItem(`vote_${_id}`, direction);
    }
  }, [direction]);

  async function vote(direction: "up" | "down") {
    const res = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({ id: _id, direction }),
    });
    if (res.status == 200) {
      const ok = await res.json();
      if (direction == "up") {
        setDirection((v) => {
          if (v == "down") {
            setDownvotes((v) => v - 1);
          }
          return direction;
        });
        if (ok) {
          setUpvotes((v) => v + 1);
        }
      } else {
        setDirection((v) => {
          if (v == "up") {
            setUpvotes((v) => v - 1);
          }
          return direction;
        });
        if (ok) {
          setDownvotes((v) => v + 1);
        }
      }
    }
  }

  return (
    <>
      <li>
        <button
          onClick={() => vote("up")}
          class={`flex items-center justify-center gap-2.5 border-morefur border-2 border-r-0
          p-2 rounded-l-xl ${direction == "up" ? "active" : ""}`}
        >
          <Vote direction="up" /> {upvotes}
        </button>
      </li>
      <li>
        <button
          onClick={() => vote("down")}
          class={`flex items-center justify-center gap-2.5 border-morefur border-2 p-2 rounded-r-xl ${
            direction == "down" ? "active" : ""
          }`}
        >
          <Vote direction="down" /> {downvotes}
        </button>
      </li>
    </>
  );
}
