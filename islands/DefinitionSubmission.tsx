import { useState } from "preact/hooks";
import { Loading } from "@/components/icons/Loading.tsx";

export default function DefinitionSubmission() {
  const [status, setStatus] = useState("toSubmit");
  const [result, setResult] = useState("");
  return (
    <div class="w-full mx-auto max-w-xl">
      {status == "submitted" ? <p>{result}</p> : (
        <>
          <form
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            class="flex flex-col gap-5"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const body = JSON.stringify(
                Object.fromEntries(formData.entries()),
              );
              setStatus("submitting");
              const { status } = await fetch(location.href, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body,
              });
              setResult(
                status == 200
                  ? "Your definition was submitted."
                  : "An error occurred when submitting your definition.",
              );
              setStatus("submitted");
            }}
          >
            <input
              disabled={status != "toSubmit"}
              type="text"
              class="input"
              name="term"
              placeholder="Word/phrase"
              required
            />
            <textarea
              disabled={status != "toSubmit"}
              type="text"
              class="input"
              name="definition"
              placeholder="Your definition"
              rows={10}
              required
            />
            <button
              disabled={status != "toSubmit"}
              type="submit"
              class="button"
            >
              {status == "submitting"
                ? (
                  <>
                    <Loading /> Submitting...
                  </>
                )
                : (
                  "Submit"
                )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
