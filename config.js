import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DRY_RUN = String(process.env.DRY_RUN || "true").toLowerCase() === "true";

export const META_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "";
export const META_APP_SECRET = process.env.META_APP_SECRET || "";
export const IG_USER_ID = process.env.IG_USER_ID || "";
export const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || "";
export const GUIDE_URL = process.env.GUIDE_URL || "";
export const BRAND_NAME = process.env.BRAND_NAME || "CassInTexas";

const rawTriggers =
  process.env.TRIGGER_KEYWORDS ||
  "guia,quero guia,manda o guia,me manda o guia,ebook,e-book,free ebook,quero o guia";

export const TRIGGER_KEYWORDS = rawTriggers
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);
