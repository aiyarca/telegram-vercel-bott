export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).send("ok");

  const token = process.env.BOT_TOKEN;
  const update = req.body;

  const message = update?.message;
  const chatId = message?.chat?.id;
  const text = message?.text;

  if (!chatId) return res.status(200).send("no chat");

  if (text === "/start") {
    await fetch(`https://api.telegram.org/bot${8251671545:AAFoVL8TKKJCu6eaDyfZtfVPEm70_zHJ6Kg}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: "hello" })
    });
  }

  return res.status(200).json({ ok: true });
}
