export function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++)
    binary += String.fromCharCode(bytes[i]!);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function generateCodeVerifier(length = 64): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const random = new Uint8Array(length);
  crypto.getRandomValues(random);

  let verifier = "";
  for (const byte of random) {
    verifier += charset.charAt(byte % charset.length);
  }
  if (verifier.length < 43) return verifier.padEnd(43, "A");
  if (verifier.length > 128) return verifier.slice(0, 128);
  return verifier;
}

export async function sha256(input: string): Promise<ArrayBuffer> {
  const data = new TextEncoder().encode(input);
  return crypto.subtle.digest("SHA-256", data);
}

export async function generateCodeChallengeS256(
  codeVerifier: string,
): Promise<string> {
  const digest = await sha256(codeVerifier);
  return base64UrlEncode(digest);
}

export function generateState(length = 16): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
