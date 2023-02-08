export function Vote({ direction }: { direction: "up" | "down" }) {
  if (direction == "up") {
    return (
      <svg
        viewBox="0 0 34 34"
        width="16"
        height="16"
        fill="currentColor"
      >
        <path d="M34 15c0-2-1-3-3-3H21l2-8-1-2-2-2-10 11-1 3v17c0 2 2 3 3 3h14l3-2 5-12v-5zM0 34h6V14H0v20z" />
      </svg>
    );
  } else {
    return (
      <svg
        viewBox="0 0 34 34"
        width="16"
        height="16"
        fill="currentColor"
      >
        <path d="M28 0v20h6V0h-6zm-6 0H8L5 2 0 14v5c0 2 1 3 3 3h10l-2 8 1 2 2 2 10-11 1-3V3l-3-3z" />
      </svg>
    );
  }
}
