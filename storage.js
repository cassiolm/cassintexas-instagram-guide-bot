const processedComments = new Set();

export function hasProcessed(commentId) {
  return processedComments.has(commentId);
}

export function markProcessed(commentId) {
  processedComments.add(commentId);
}
