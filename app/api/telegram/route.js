export async function POST(request) {
  try {
    const { name, phone, message, course } = await request.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing TELEGRAM env vars" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const text =
      `📩 Yeni Mesaj\n` +
      `Kurs: ${course || "Belirtilmedi"}\n` +
      `Ad: ${name}\n` +
      `Tel: ${phone}\n` +
      `Mesaj: ${message}`;

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return new Response(JSON.stringify({ ok: false, error: t || "TG error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
