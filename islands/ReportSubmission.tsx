import { useState } from "preact/hooks";
import { Loading } from "@/components/icons/Loading.tsx";
import { DefinitionProps } from "@/components/Definition.tsx";

export default function ReportSubmission({
  _id,
  author,
  term,
}: DefinitionProps) {
  const [status, setStatus] = useState("toSubmit");
  const [result, setResult] = useState("");
  return (
    <div>
      {status == "submitted" ? <p>{result}</p> : (
        <form
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          class="flex flex-col gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const body = JSON.stringify(Object.fromEntries(formData.entries()));
            setStatus("submitting");
            const { status } = await fetch("/report", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body,
            });
            setResult(
              status == 200
                ? "Thanks for letting us know!"
                : "An error occurred when submitting your report.",
            );
            setStatus("submitted");
          }}
        >
          <input type="hidden" name="id" value={_id.toString()} />
          <input
            type="text"
            class="input"
            name="term"
            id="term"
            value={`${term} (by ${author})`}
            readonly
            required
          />
          <textarea
            disabled={status != "toSubmit"}
            type="text"
            class="input"
            name="complain"
            placeholder="Your report"
            rows={10}
            required
          />
          <button disabled={status != "toSubmit"} type="submit" class="button">
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
      )}
    </div>
  );
}
