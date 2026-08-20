// Server-side image upload validation. Never trust a client-supplied
// filename extension or File.type — both are attacker-controlled. Instead
// sniff the real file signature and only accept raster image formats.
// SVG is deliberately excluded: it's XML and can carry a <script>, which
// would execute if ever served/opened inline from our own origin/CDN.

type SniffResult = { ext: string; contentType: string };

function matches(bytes: Uint8Array, offset: number, signature: number[]) {
  if (bytes.length < offset + signature.length) return false;
  return signature.every((byte, i) => bytes[offset + i] === byte);
}

/** Reads the first bytes of a File and identifies it by magic number. Returns null for anything not on the allow-list (including SVG/GIF/HEIC/etc). */
export async function sniffImage(file: File): Promise<SniffResult | null> {
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());

  if (matches(head, 0, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return { ext: "png", contentType: "image/png" };
  }
  if (matches(head, 0, [0xff, 0xd8, 0xff])) {
    return { ext: "jpg", contentType: "image/jpeg" };
  }
  // WebP: "RIFF"....."WEBP"
  if (matches(head, 0, [0x52, 0x49, 0x46, 0x46]) && matches(head, 8, [0x57, 0x45, 0x42, 0x50])) {
    return { ext: "webp", contentType: "image/webp" };
  }
  // AVIF: ISOBMFF box with an "ftyp" brand of avif/avis at offset 4/8
  const brand = new TextDecoder().decode(head.slice(4, 8));
  const subtype = new TextDecoder().decode(head.slice(8, 12));
  if (brand === "ftyp" && (subtype === "avif" || subtype === "avis")) {
    return { ext: "avif", contentType: "image/avif" };
  }

  return null;
}

export const MAX_IMAGE_BYTES = 15 * 1024 * 1024; // 15MB
