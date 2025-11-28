export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const text =
        `👣 Ziyaret: ${body?.event || "unknown"}\n` +
        `Path: ${body?.path || "/"}\n` +
        `UA: ${request.headers.get("user-agent") || "-"}`;
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }).catch(() => {});
    }

    return Response.json({ ok: true });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
