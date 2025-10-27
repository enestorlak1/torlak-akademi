"use client"; // App Router'da gerekli

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Mesajınız Telegram’a gönderildi ✅");
        e.target.reset();
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("Bir hata oluştu ❌");
        setTimeout(() => setStatus(""), 3000);
      }
    } catch (err) {
      setStatus("Sunucu hatası ❌");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-bold">İletişim Formu</h1>

        <label className="block">
          <span className="text-sm">Ad Soyad</span>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Telefon</span>
          <input
            name="phone"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Mesajınız</span>
          <textarea
            name="message"
            rows="4"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          ></textarea>
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-700"
        >
          Gönder
        </button>

        {status && <p className="mt-2 text-center text-sm">{status}</p>}
      </form>
    </div>
  );
}
