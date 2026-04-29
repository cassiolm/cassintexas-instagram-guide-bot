import { extractCommentEvents } from "./webhookEvents.js";
import { shouldTriggerGuide, sendPrivateReply } from "./meta.js";
import { buildGuideMessage } from "./text.js";
import { hasProcessed, markProcessed } from "./storage.js";

export async function processWebhookBody(body) {
  const events = extractCommentEvents(body);
  const results = [];

  for (const event of events) {
    const { commentId, text, username } = event;

    if (hasProcessed(commentId)) {
      results.push({ commentId, skipped: true, reason: "already_processed" });
      continue;
    }

    if (!shouldTriggerGuide(text)) {
      results.push({ commentId, skipped: true, reason: "no_trigger" });
      continue;
    }

    markProcessed(commentId);

    const message = buildGuideMessage(username);
    const sendResult = await sendPrivateReply(commentId, message);

    results.push({ commentId, username, sent: true, result: sendResult });
  }

  return results;
}
