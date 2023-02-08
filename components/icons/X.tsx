// deno-lint-ignore no-explicit-any
export function X(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M21 3 3 21M3 3l18 18"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
