FROM denoland/deno
WORKDIR /app
COPY . .
RUN deno cache main.ts $(deno run scripts/get_uncached_dependencies.ts)
CMD ["run", "--allow-env", "--allow-net", "--allow-read", "--allow-run", "--allow-write", "main.ts"]
