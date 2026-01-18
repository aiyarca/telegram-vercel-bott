export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).send("ok");

  const token = process.env.BOT_TOKEN;
  const update = req.body;

  const message = update?.message;
  const chatId = message?.chat?.id;
  const text = message?.text;

  if (!chatId) return res.status(200).send("no chat");

  if (text === "/start") {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: `Buy PolycubeBOT in seconds 🤘🏻
You will receive the trading bot and all the information on how to get started following the payment : 

💳 Bitcoin: 150$ BTC (Payment address below 👇🏻)
\`bc1qmsv44alvzpw6mufpxd8yreclrsud4wc98ptkmm\` (click to copy)

💳 Ethereum: 150$ ETH (Payment address below 👇🏻)
\`0x694d3be01f6500f961017d60BA6cFEA65744F5F2\` (click to copy)

💳 Solana: 150$ SOL (Payment address below 👇🏻)
\`3KwrUhvsxbjdF1zJsBZ5yFEXiyZGwQixPjbnNeZXVyhj\` (click to copy)

Once the payment made, please allow 1 hour for the blockchain to confirm the payment` })
    });
  }

  return res.status(200).json({ ok: true });
}
