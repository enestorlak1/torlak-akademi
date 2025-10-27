"use client";
import { useState } from "react";

const COURSES = [
  {
    id: "java",
    title: "Java (Core Java & OOP) Kursu",
    content:
      "Bu kursta sıfırdan Java programlamayı öğrenirsin. Değişken, koşul, döngü ve metot gibi temel yapıları adım adım uygularsın. Nesne yönelimli programlama (OOP) mantığını basit örneklerle kavrarsın. Kurstan sonra küçük masaüstü uygulamaları geliştirebilecek seviyeye gelirsin.",
    projects: [
      "Konsol Tabanlı Not/Kütüphane Uygulaması",
      "OOP Personel & Maaş Yönetimi",
      "Dosya/CSV Okuma–Yazma Aracı",
      "Basit Banka/ATM Simülasyonu",
      "Mini REST API (Spring Boot’e giriş tadında)",
    ],
    image: "/images/java.png",
  },
  {
    id: "python",
    title: "Python Yazılım Kursu",
    content:
      "Python’a hiç bilmeyenler için sade bir başlangıç yapıyoruz. Temel söz dizimi, veri tipleri ve fonksiyonlar ile pratik kazanırsın. Dosya okuma, basit veri analizi ve küçük otomasyonlar yazmayı öğrenirsin. Kurstan sonra günlük işleri kolaylaştıran script’ler geliştirebilirsin.",
    projects: [
      "CSV → Temizleme → Raporlama Komutu",
      "Flask ile Basit Web API",
      "Otomasyon: Klasör İzleyip PDF Taşıyan Script",
      "SQLite ile Kişisel Not Defteri",
      "Web Scraper: Haber Başlığı Toplayıcı",
    ],
    image: "/images/python.png",
  },
  {
    id: "webtest",
    title: "Web Yazılım Test Otomasyon Kursu",
    content:
      "Web sitelerini otomatik olarak test etmeyi öğrenirsin. Tarayıcıyı açıp tıklayan, yazan ve kontrol eden script’ler yazarsın. Hataları yakalamayı ve raporlamayı pratik edersin. Kurstan sonra basit web projeleri için güvenilir otomatik testler hazırlayabilirsin.",
    projects: [
      "Login/Logout + Negatif Senaryolar",
      "E-Ticaret: Sepet–Ödeme Akışı Smoke Test",
      "Page Object Model Refaktörü",
      "CI’da (GitHub Actions) Headless Çalıştırma",
      "Allure/HTML Rapor Entegrasyonu",
    ],
    image: "/images/webtest.png",
  },
  {
    id: "mobiletest",
    title: "Mobil Yazılım Test Otomasyon Kursu",
    content:
      "Android/iOS uygulamalarını otomatik test etmeye sıfırdan başlarsın. Ekranda dokunma, kaydırma ve yazma gibi hareketleri kodla simüle edersin. Farklı cihazlarda aynı senaryoları çalıştırmayı öğrenirsin. Kurstan sonra temel mobil test setlerini kurup koşturabilirsin.",
    projects: [
      "Android Login & Push Bildirim Testleri",
      "Ekran Kaydırma ile Ürün Listeleme Doğrulama",
      "Deep Link & Permission Senaryoları",
      "TestNG/JUnit + Allure Raporları",
      "BrowserStack/Emülatörde Paralel Koşum",
    ],
    image: "/images/mobiletest.png",
  },
  {
    id: "plc",
    title: "Siemens PLC Yazılım Kursu",
    content:
      "Sanayide kullanılan PLC’lerle otomasyon mantığını en temel hâliyle öğrenirsin. Butona basınca motorun nasıl çalıştığını, sensörlerden gelen bilginin sisteme nasıl aktarıldığını görürsün. Basit elektrik/elektronik kavramlarını uygulama üzerinden kavrarsın. Kurstan sonra küçük PLC senaryolarını kurup çalıştırabilirsin.",
    projects: [
      "Start/Stop Motor Kumandası (self-hold)",
      "Sensörlü Konveyör Otomasyonu",
      "0–10 V Analog Seviye Kontrolü",
      "HMI ile Tank Dolum Simülasyonu",
      "Modbus/TCP ile Veri İzleme",
    ],
    image: "/images/plc.png",
  },
  {
    id: "arduino",
    title: "Arduino Yazılım Kursu",
    content:
      "Elektronikle yeni tanışanlar için adım adım Arduino öğretir. LED, buton, buzzer ve sensörlerle küçük devreler kurarsın. Basit ölçümler yapar, motor ve röle gibi parçaları nasıl kontrol edeceğini öğrenirsin. Kurstan sonra kendi minik akıllı cihazlarını yapmaya başlayabilirsin.",
    projects: [
      "Buton Kontrollü LED & Buzzer",
      "DHT11 ile Sıcaklık/Nem Termometresi (LCD/I²C)",
      "Ultrasonik Mesafe Ölçer ile Park Sensörü",
      "Servo Motorlu Mini Kapı Sistemi",
      "Röle ile Fan Kontrolü: Mini Akıllı Sera",
    ],
    image: "/images/arduino.png",
  },
  {
    id: "scratch",
    title: "Scratch ile Robotik Kodlama Kursu",
    content:
      "Çocuklar ve yeni başlayanlar için sürükle–bırak kodlama ile başlıyoruz. Karakterleri hareket ettirir, olaylara tepki veren basit oyunlar kurarsın. Mantıksal düşünme ve problem çözme becerisi gelişir. Kurstan sonra kendi mini oyunlarını ve animasyonlarını yapabilirsin.",
    projects: [
      "Labirent Oyunu (çarpışma kontrolü)",
      "Sesle Çalışan Karakter",
      "Skor Tutan Platform Oyunu",
      "Renk Sensörü Simülasyonu",
      "Engelden Kaçan Mini Robot Mantığı",
    ],
    image: "/images/scratch.png",
  },
];

export default function TorlakAkademi() {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false); // iletişim modalı
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
      course: selected ? selected.title : "Belirtilmedi",
    };

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("✅ Mesajınız başarıyla gönderildi!");
        e.target.reset();
        setTimeout(() => {
          setShowModal(false);
          setStatus("");
        }, 2000);
      } else {
        setStatus("❌ Bir hata oluştu, tekrar deneyin.");
      }
    } catch {
      setStatus("⚠️ Sunucu hatası.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200 text-slate-900 py-10 overflow-hidden font-sans">
      {/* Ana içerik */}
      <div className={`transition-all duration-500 ${selected ? "filter blur-md scale-[0.98]" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 relative">
          <h1 className="text-4xl font-bold mb-8 text-center text-slate-800">
            CodeG Academy
          </h1>

          {/* Kurs Kartları */}
          <div className="flex flex-wrap justify-center gap-8">
            {COURSES.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                className="group relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden w-64 h-64 flex flex-col justify-end items-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="bg-indigo-600 px-4 py-2 rounded-lg font-semibold text-white hover:bg-indigo-700 shadow">
                    Detayları Gör
                  </button>
                </div>
                <div className="bg-gray-50 w-full text-center py-2 font-semibold text-slate-800 z-20">
                  {c.title}
                </div>
              </div>
            ))}
          </div>

          {/* Alt bilgi / Eğitmenler */}
          <section className="relative mt-12 text-center">
            <h2 className="text-2xl font-bold text-slate-800">Eğitmenler</h2>

            {/* İsimler + sağda İletişime Geç butonu */}
            <div className="relative mt-3 inline-block">
              <div className="space-y-1 pr-40">
                <p className="text-indigo-700 font-semibold text-lg">Elektrik Elektronik Mühendisi Enes Torlak</p>
                <p className="text-indigo-700 font-semibold text-lg">Yazılım Mühendisi Ahmet Naim Torlak</p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                aria-label="İletişime Geç"
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white text-indigo-700 border border-indigo-200 px-5 py-2 shadow hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                İletişime Geç
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Kurs Detay */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-3xl border border-indigo-100 relative animate-slideFadeIn"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-4 text-slate-500 text-2xl hover:text-slate-700"
            >
              ✕
            </button>

            {/* Görsel */}
            <div className="flex justify-center mb-6">
              <img
                src={selected?.image}
                alt={selected?.title}
                className="w-full max-w-lg h-[300px] object-contain rounded-lg shadow-lg bg-white p-3"
              />
            </div>

            <h1 className="text-3xl font-bold text-indigo-700 mb-3 text-center">{selected.title}</h1>
            <p className="text-slate-700 text-center mb-4">{selected.content}</p>

            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
              <h3 className="text-indigo-700 font-semibold mb-2 text-center">Örnek Projeler:</h3>
              <ul className="list-none text-slate-700 space-y-1 text-center">
                {selected.projects.map((proj, i) => (
                  <li key={i}>{proj}</li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-center text-slate-500 mb-4">🎓 Katılım Sertifikası verilecektir.</p>

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-indigo-600 text-white rounded-lg py-3 font-semibold hover:bg-indigo-700 transition"
            >
              📩 İletişime Geç
            </button>
          </div>
        </div>
      )}

      {/* İletişim Modalı (telefon/e-posta + mesaj formu) */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 w-96 animate-slideFadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-indigo-700 mb-2 text-center">İletişim</h2>

            {/* Kurs bilgisi (opsiyonel) */}
            <p className="text-center text-slate-500 text-sm mb-3">
              Kurs: <span className="font-medium">{selected ? selected.title : "Belirtilmedi"}</span>
            </p>

            <div className="text-center text-slate-700 mb-4 space-y-1">
              <p>📞 0543 934 0560</p>
              <p>📧 engineer.enestorlak@gmail.com</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="hidden" name="course" value={selected ? selected.title : "Belirtilmedi"} />
              <input
                name="name"
                placeholder="Ad Soyad"
                required
                className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-slate-900"
              />
              <input
                name="phone"
                placeholder="Telefon"
                required
                className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-slate-900"
              />
              <textarea
                name="message"
                placeholder="Mesajınız"
                rows="3"
                required
                className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-slate-900"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white rounded-lg py-2 font-semibold hover:bg-indigo-700"
              >
                Mesaj Gönder
              </button>
              {status && <p className="text-center text-indigo-700 font-medium mt-2">{status}</p>}
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-sm text-slate-500 hover:underline w-full text-center"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Animasyon */}
      <style jsx global>{`
        @keyframes slideFadeIn {
          from { opacity: 0; transform: translateY(-25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideFadeIn { animation: slideFadeIn 0.45s ease forwards; }
      `}</style>
    </div>
  );
}
