// pages/api/telegram.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { course, name, phone, message } = req.body;

    const botToken = "8309695366:AAHks0CMJxFx_LsVV226wvVID5kvJVe6pzg"; // Bot token
    const chatId = "7797913134"; // Senin chat_id
    const text = `📩 Yeni Başvuru
📌 Kurs: ${course || "Belirtilmedi"}
👤 Ad Soyad: ${name}
📞 Telefon: ${phone}
💬 Mesaj: ${message}`;

    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      });

      if (response.ok) {
        return res
          .status(200)
          .json({ ok: true, message: "Mesaj Telegram’a gönderildi ✅" });
      } else {
        const err = await response.json();
        return res.status(500).json({ ok: false, error: err });
      }
    } catch (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
