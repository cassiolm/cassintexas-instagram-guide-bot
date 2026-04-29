import crypto from "crypto";
import { META_APP_SECRET } from "./config.js";

export function verifyMetaSignature(req) {
  if (!META_APP_SECRET) {
    console.warn("META_APP_SECRET is not set. Signature validation skipped.");
    return true;
  }

  const signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    console.warn("Missing x-hub-signature-256 header.");
    return false;
  }

  const expected =
    "sha256=" +
    crypto
      .createHmac("sha256", META_APP_SECRET)
      .update(req.rawBody)
      .digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}
