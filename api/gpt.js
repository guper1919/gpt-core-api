export default async function handler(req, res) {
  const { prompt } = req.body || {};

  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    const gpt = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await gpt.json();

    return res.status(200).json({
      result: data?.choices?.[0]?.message?.content?.trim() || "No result",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch from OpenAI",
      details: error.message,
    });
  }
}
