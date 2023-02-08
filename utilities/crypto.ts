export async function digestAddr(addr: Deno.Addr) {
  return Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode((addr as Deno.NetAddr).hostname),
      ),
    ),
  ).map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
}
