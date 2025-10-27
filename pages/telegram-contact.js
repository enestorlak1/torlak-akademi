// pages/api/telegram-contact.js
// Form verilerini Telegram botuna gönderen backend

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, phone, message, course, when, source } = req.body || {};

    // ⚠️ TEST TOKEN (sadece test için, üretimde .env'e taşı)
    const BOT_TOKEN = "8309695366:AAHks0CMJxFx_LsVV226wvVID5kvJVe6pzg";

    // 🧭 Chat ID (getUpdates ile bulacaksın)
    const CHAT_ID = "7797913134";

    const text =
      `📩 Yeni Başvuru / Mesaj\n` +
      `Kurs: ${course || "Genel"}\n` +
      `Ad Soyad: ${name}\n` +
      `Telefon: ${phone}\n` +
      `Mesaj: ${message || "-"}\n` +
      `Zaman: ${when || new Date().toISOString()}\n` +
      `Kaynak: ${source || "torlak-akademi-site"}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      return res.status(500).json({ error: "Telegram hatası", details: errText });
    }

    return res.status(200).json({ ok: true, message: "Telegram'a iletildi." });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Sunucu hatası" });
  }
}
