// api/webhook.js

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") return res.status(200).send("OK");

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
      const msg = `<b>Buy access to Polycube Trading BOT 🤖</b>
Once the payment is confirmed enter /commands to get started

💳 <b>Bitcoin:</b> 150$ BTC (Payment address below 👇🏻)
<code>bc1qmsv44alvzpw6mufpxd8yreclrsud4wc98ptkmm</code> (Click to copy)

💳 <b>Ethereum:</b> 150$ ETH (Payment address below 👇🏻)
<code>0x694d3be01f6500f961017d60BA6cFEA65744F5F2</code> (Click to copy)

💳 <b>Solana:</b> 150$ SOL (Payment address below 👇🏻)
<code>3KwrUhvsxbjdF1zJsBZ5yFEXiyZGwQixPjbnNeZXVyhj</code> (Click to copy)

<i>Once the payment is made, please allow 1 hour for the blockchain to confirm the payment.</i>`;

      const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          parse_mode: "HTML",
          text: msg,
          disable_web_page_preview: true,
        }),
      });

      // Log Telegram errors (this is SUPER helpful on Vercel)
      const data = await tgRes.json();
      if (!data.ok) console.error("Telegram sendMessage error:", data);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(200).json({ ok: true });
  }
};
