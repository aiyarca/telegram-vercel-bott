// api/webhook.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  // Telegram will POST updates (messages) here
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;

  try {
    const update = req.body;

    // Basic safety checks
    const message = update.message;
    if (!message) return res.status(200).json({ ok: true });

    const chatId = message.chat.id;
    const text = message.text || "";

    // If user types /start, reply Hello
    if (text === "/start") {
      const sendMessageUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

      await fetch(sendMessageUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "🔒Please enter your validation key to start trading on the BOT :",
        }),
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ ok: true }); // Telegram only needs 200
  }
}
