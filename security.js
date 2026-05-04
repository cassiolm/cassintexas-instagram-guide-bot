import crypto from "crypto";
import { META_APP_SECRET } from "./config.js";

const INSTAGRAM_APP_SECRET = process.env.INSTAGRAM_APP_SECRET || "";

const SKIP_SIGNATURE_CHECK =
  String(process.env.SKIP_SIGNATURE_CHECK || "false").toLowerCase() === "true";

function buildExpectedSignature(secret, rawBody) {
  return (
    "sha256=" +
    crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex")
  );
}

function safeCompare(a, b) {
  try {
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

export function verifyMetaSignature(req) {
  if (SKIP_SIGNATURE_CHECK) {
    console.warn(
      "SKIP_SIGNATURE_CHECK=true. Webhook signature validation skipped."
    );
    return true;
  }

  const signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    console.warn("Missing x-hub-signature-256 header.");
    return false;
  }

  if (!req.rawBody) {
    console.warn("Missing raw request body. Cannot validate signature.");
    return false;
  }

  const secretsToTry = [
    {
      name: "META_APP_SECRET",
      value: META_APP_SECRET
    },
    {
      name: "INSTAGRAM_APP_SECRET",
      value: INSTAGRAM_APP_SECRET
    }
  ].filter((secret) => Boolean(secret.value));

  if (secretsToTry.length === 0) {
    console.warn(
      "No app secret configured. Set META_APP_SECRET or INSTAGRAM_APP_SECRET."
    );
    return false;
  }

  for (const secret of secretsToTry) {
    const expected = buildExpectedSignature(secret.value, req.rawBody);

    if (safeCompare(signature, expected)) {
      console.log(`Webhook signature verified with ${secret.name}.`);
      return true;
    }
  }

  console.warn("Webhook signature verification failed with all configured secrets.", {
    hasMetaAppSecret: Boolean(META_APP_SECRET),
    hasInstagramAppSecret: Boolean(INSTAGRAM_APP_SECRET),
    signatureHeaderPresent: Boolean(signature)
  });

  return false;
}
