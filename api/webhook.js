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

    // Parse body (Vercel compatibility)
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
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          parse_mode: "MarkdownV2",
          text: `*Buy access to Polycube Trading BOT 🤖*

Once the payment is confirmed, enter /commands to get started.

💳 *Bitcoin:* 150\\$ BTC  
\`bc1qmsv44alvzpw6mufpxd8yreclrsud4wc98ptkmm\`

💳 *Ethereum:* 150\\$ ETH  
\`0x694d3be01f6500f961017d60BA6cFEA65744F5F2\`

💳 *Solana:* 150\\$ SOL  
\`3KwrUhvsxbjdF1zJsBZ5yFEXiyZGwQixPjbnNeZXVyhj\`

_Once payment is made, please allow up to 1 hour for blockchain confirmation._`
        })
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(200).json({ ok: true });
  }
};
