export default async function handler(req, res) {
  const { prompt } = req.body || {};

  const gpt = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt ?? "Hello" }
      ],
    }),
  });

  const data = await gpt.json();
  res.status(200).json({ result: data.choices?.[0]?.message?.content ?? "" });
}
