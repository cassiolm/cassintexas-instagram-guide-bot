import express from "express";
import { PORT, META_VERIFY_TOKEN } from "./config.js";
import { verifyMetaSignature } from "./security.js";
import { processWebhookBody } from "./handler.js";
import { shouldTriggerGuide, sendPrivateReply } from "./meta.js";
import { buildGuideMessage } from "./text.js";

const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    service: "cassintexas-instagram-guide-bot",
    message: "Bot is running"
  });
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === META_VERIFY_TOKEN) {
    console.log("Webhook verified.");
    return res.status(200).send(challenge);
  }

  console.warn("Webhook verification failed.");
  return res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  if (!verifyMetaSignature(req)) {
    return res.sendStatus(403);
  }

  res.sendStatus(200);

  try {
    const results = await processWebhookBody(req.body);
    console.log("Webhook processed:", results);
  } catch (error) {
    console.error("Webhook processing error:", error);
  }
});

app.post("/test/comment", async (req, res) => {
  try {
    const { username = "test_user", text = "GUIA" } = req.body || {};

    if (!shouldTriggerGuide(text)) {
      return res.status(200).json({
        ok: true,
        triggered: false,
        message: "No trigger keyword found."
      });
    }

    const messageText = buildGuideMessage(username);
    const result = await sendPrivateReply(`test_${Date.now()}`, messageText);

    return res.status(200).json({
      ok: true,
      triggered: true,
      result
    });
  } catch (error) {
    console.error("Test endpoint error:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`CassInTexas Instagram Guide Bot listening on port ${PORT}`);
});
