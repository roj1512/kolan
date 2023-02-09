// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_500.tsx";
import * as $2 from "./routes/_app.tsx";
import * as $3 from "./routes/_middleware.tsx";
import * as $4 from "./routes/api/vote.ts";
import * as $5 from "./routes/index.tsx";
import * as $6 from "./routes/report.tsx";
import * as $7 from "./routes/submissions.tsx";
import * as $8 from "./routes/submit.tsx";
import * as $$0 from "./islands/DefinitionSubmission.tsx";
import * as $$1 from "./islands/Header.tsx";
import * as $$2 from "./islands/Plus.tsx";
import * as $$3 from "./islands/ReportSubmission.tsx";
import * as $$4 from "./islands/ReviewButtons.tsx";
import * as $$5 from "./islands/VoteButtons.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_500.tsx": $1,
    "./routes/_app.tsx": $2,
    "./routes/_middleware.tsx": $3,
    "./routes/api/vote.ts": $4,
    "./routes/index.tsx": $5,
    "./routes/report.tsx": $6,
    "./routes/submissions.tsx": $7,
    "./routes/submit.tsx": $8,
  },
  islands: {
    "./islands/DefinitionSubmission.tsx": $$0,
    "./islands/Header.tsx": $$1,
    "./islands/Plus.tsx": $$2,
    "./islands/ReportSubmission.tsx": $$3,
    "./islands/ReviewButtons.tsx": $$4,
    "./islands/VoteButtons.tsx": $$5,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
