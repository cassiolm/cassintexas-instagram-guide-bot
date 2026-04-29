import { DRY_RUN, IG_USER_ID, META_ACCESS_TOKEN, TRIGGER_KEYWORDS } from "./config.js";
import { normalizeText } from "./text.js";

export function shouldTriggerGuide(commentText = "") {
  const normalizedComment = normalizeText(commentText);
  return TRIGGER_KEYWORDS.some((keyword) =>
    normalizedComment.includes(normalizeText(keyword))
  );
}

export async function sendPrivateReply(commentId, messageText) {
  if (!IG_USER_ID) throw new Error("Missing IG_USER_ID.");
  if (!META_ACCESS_TOKEN) throw new Error("Missing META_ACCESS_TOKEN.");

  if (DRY_RUN) {
    console.log("[DRY_RUN] Would send private reply:", { commentId, messageText });
    return { dryRun: true, commentId, messageText };
  }

  const url = `https://graph.facebook.com/v18.0/${IG_USER_ID}/messages`;

  const payload = {
    recipient: { comment_id: commentId },
    message: { text: messageText }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${META_ACCESS_TOKEN}`
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Meta API error:", data);
    throw new Error(`Failed to send private reply: ${JSON.stringify(data)}`);
  }

  return data;
}
