import {
  DRY_RUN,
  IG_USER_ID,
  META_ACCESS_TOKEN,
  TRIGGER_KEYWORDS
} from "./config.js";
import { normalizeText } from "./text.js";

const META_API_HOST = process.env.META_API_HOST || "graph.instagram.com";
const META_API_VERSION = process.env.META_API_VERSION || "v25.0";

export function shouldTriggerGuide(commentText = "") {
  const normalizedComment = normalizeText(commentText);

  return TRIGGER_KEYWORDS.some((keyword) =>
    normalizedComment.includes(normalizeText(keyword))
  );
}

export async function sendPrivateReply(commentId, messageText) {
  if (!IG_USER_ID) {
    throw new Error("Missing IG_USER_ID.");
  }

  if (!META_ACCESS_TOKEN) {
    throw new Error("Missing META_ACCESS_TOKEN.");
  }

  if (DRY_RUN) {
    console.log("[DRY_RUN] Would send private reply:", {
      commentId,
      messageText
    });

    return {
      dryRun: true,
      commentId,
      messageText
    };
  }

  const cleanToken = META_ACCESS_TOKEN.trim();

  const url = `https://${META_API_HOST}/${META_API_VERSION}/${IG_USER_ID}/messages`;

  console.log("Sending private reply through Meta API:", {
    host: META_API_HOST,
    version: META_API_VERSION,
    igUserId: IG_USER_ID,
    commentId
  });

  const payload = {
    recipient: {
      comment_id: commentId
    },
    message: {
      text: messageText
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cleanToken}`
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Meta API error:", data);
    throw new Error(`Failed to send private reply: ${JSON.stringify(data)}`);
  }

  console.log("Private reply sent successfully:", data);

  return data;
}
