export default async function handler(req, res) {
  const { prompt } = req.body || {};

  const gpt = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // ✅ ключ из переменной окружения
    },
    body: JSON.stringify({
      model: "gpt-4", // можно заменить на gpt-3.5-turbo, если нет доступа
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt || "Hello" }, // ✅ fallback
      ],
    }),
  });

  const data = await gpt.json();

  res.status(200).json({
    result: data.choices?.[0]?.message?.content || "Нет ответа",
  });
}

