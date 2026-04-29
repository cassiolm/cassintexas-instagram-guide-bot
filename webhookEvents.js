export function extractCommentEvents(body) {
  const events = [];

  for (const entry of body?.entry || []) {
    for (const change of entry?.changes || []) {
      const value = change?.value || {};

      const commentId =
        value.id ||
        value.comment_id ||
        value.comment?.id ||
        value.comment?.comment_id ||
        null;

      const text =
        value.text ||
        value.message ||
        value.comment?.text ||
        value.comment?.message ||
        null;

      const mediaId =
        value.media?.id ||
        value.media_id ||
        value.post_id ||
        value.parent_id ||
        null;

      const username =
        value.from?.username ||
        value.from?.name ||
        value.user?.username ||
        null;

      if (commentId && text) {
        events.push({ commentId, mediaId, text, username, raw: change });
      }
    }
  }

  return events;
}
