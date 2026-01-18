// api/webhook.js

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(200).send("OK");
    }

    const BOT_TOKEN = process.env.BOT_TOKEN;
    if (!BOT_TOKEN) {
      console.error("Missing BOT_TOKEN env var");
      return res.status(200).json({ ok: true });
    }

    // Vercel sometimes gives req.body, sometimes you need to parse raw body
    let update = req.body;

    if (!update || typeof update !== "object") {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString("utf8");
      if (raw) update = JSON.parse(raw);
    }

    const message = update?.message;
    if (!message) return res.status(200).json({ ok: true });

    const chatId = message.chat.id;
    const text = message.text || "";

    if (text === "/start") {
      // Node 18+ on Vercel has global fetch (no node-fetch needed)
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: "🔒Please enter your validation key to start trading on the BOT :" }),
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    // Telegram mostly just needs a 200 response so it stops retrying
    return res.status(200).json({ ok: true });
  }
};
