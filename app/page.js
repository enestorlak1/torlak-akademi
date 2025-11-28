"use client";
import { useEffect, useState } from "react";

/** Basit, herkesin anlayacağı dilde kurs açıklamaları */
const COURSES = [
  {
    id: "java",
    title: "Java (Core Java & OOP) Kursu",
    content:
      "Yaş: 15+. Bu kursta sıfırdan Java öğrenirsin: değişken, koşul, döngü gibi temel konular; ardından sınıflar ve nesnelerle (OOP) düzenli kod yazmayı kavrarsın. Kurs sonunda hataları yakalayan, dosyadan veri okuyup işleyen ve mantıklı menülere sahip küçük programlar geliştirirsin. Böylece okul projelerini rahatlıkla yapar, staj/iş görüşmelerinde gösterecek örnek uygulamaların olur.",
    projects: [
      "Konsol Not/Kütüphane Uygulaması",
      "OOP Personel & Maaş Yönetimi",
      "Dosya/CSV Okuma–Yazma Aracı",
      "Basit Banka/ATM Simülasyonu",
      "Mini REST API (Spring Boot’e giriş)",
    ],
    image: "/images/java.png",
  },
  {
    id: "python",
    title: "Python Yazılım Kursu",
    content:
      "Yaş: 14+. Sıfırdan Python’a başlarsın; listeler, sözlükler, fonksiyonlar gibi temel taşları öğrenirsin. Kısa sürede günlük işleri otomatikleştiren küçük programlar yazabilirsin: klasör düzenleme, dosya adlandırma, web’den veri çekme ve CSV’den rapor çıkarma. Kurs sonunda hobilerini, okul/iş işlerini hızlandıran pratik otomasyonlar geliştirebilirsin.",
    projects: [
      "CSV → Temizleme → Raporlama",
      "Flask ile Basit Web API",
      "Klasör İzleme & PDF Taşıma",
      "SQLite Not Defteri",
      "Haber Başlığı Web Scraper",
    ],
    image: "/images/python.png",
  },
  {
    id: "webtest",
    title: "Web Yazılım Test Otomasyon Kursu",
    content:
      "Yaş: 16+. Web sitelerini insan yerine otomatik olarak test eden senaryolar yazmayı öğrenirsin. Giriş-çıkış, sepete ekleme, ödeme gibi akışları tek tıkla deneyen sağlam testler kurar; rapor alırsın. Kurs sonunda bir e-ticaret sitesinin temel kontrollerini baştan sona otomatik test eden dosyaları hazırlayıp iş başvurularında örnek olarak gösterebilirsin.",
    projects: [
      "Login/Logout + Negatif Senaryolar",
      "E-Ticaret Sepet–Ödeme Smoke Test",
      "Page Object Model Refaktörü",
      "CI’da Headless Koşum",
      "Allure/HTML Raporları",
    ],
    image: "/images/webtest.png",
  },
  {
    id: "mobiletest",
    title: "Mobil Yazılım Test Otomasyon Kursu",
    content:
      "Yaş: 16+. Telefon uygulamalarını otomatik test etmeyi öğrenirsin. Düğmelere basma, ekranda kaydırma, izin verme gibi hareketleri script’lerle yaptırır, farklı cihazlarda aynı testleri çalıştırırsın. Kurs sonunda bir mobil uygulamanın giriş, bildirim ve sayfalar arası geçişlerini otomatik kontrol eden test paketin olur.",
    projects: [
      "Login & Push Bildirim Testleri",
      "Kaydırma ile Liste Doğrulama",
      "Deep Link & Permission",
      "TestNG/JUnit + Allure",
      "BrowserStack/Emülatör Paralel",
    ],
    image: "/images/mobiletest.png",
  },
  {
    id: "plc",
    title: "Siemens PLC Yazılım Kursu",
    content:
      "Yaş: 16+. Fabrikalarda makineleri yöneten PLC’lerin mantığını baştan öğrenirsin. Start-stop, sensör okuma, motor sürme gibi temel işleri adım adım kurar, küçük HMI ekranlarıyla izlersin. Kurs kapsamında TEMEL ELEKTRİK & ELEKTRONİK (AC/DC, 24V besleme, seri-paralel bağlantı, sigorta/röle/kontaktör, sensör tipleri) de verilir. Kurs sonunda konveyör gibi basit bir hattı çalıştıracak mantığı yazabilir, anlatabileceğin bir mini otomasyon projen olur.",
    projects: [
      "Start/Stop Motor Kumandası",
      "Sensörlü Konveyör",
      "0–10 V Analog Seviye",
      "HMI Tank Dolum",
      "Modbus/TCP İzleme",
    ],
    image: "/images/plc.png",
  },
  {
    id: "arduino",
    title: "Arduino & Raspberry Pi Yazılım Kursu",
    content:
      "Yaş: 12+. LED, buton, sensör gibi parçaları kullanarak gerçek dünyayı kontrol etmeyi öğrenirsin. Kurs kapsamında TEMEL ELEKTRİK & ELEKTRONİK (voltaj-akım-direnç, breadboard, Ohm Kanunu, güvenli besleme) eğitimi de verilir. Arduino ile anlık kontrol (ör. mesafe ölç, LED yak); Raspberry Pi ile veriyi kaydet, küçük arayüz oluştur ya da ağı kullan. Kurs sonunda sıcaklığa göre fan çalıştıran mini sera, mesafe ölçen park yardımcısı gibi projeler kurabilirsin.",
    projects: [
      "Buton + LED & Buzzer",
      "DHT11 Termometre (LCD/I²C)",
      "Ultrasonik Park Sensörü",
      "Servo Kapı Sistemi",
      "Pi + Röle ile Fan: Mini Sera",
    ],
    image: "/images/arduino.png",
  },
  {
    id: "scratch",
    title: "Scratch ile Robotik Kodlama Kursu",
    content:
      "Yaş: 7–12. Sürükle-bırak bloklarla kod yazmayı öğrenirsin. Karakteri hareket ettirir, duvara çarptığında uyarı verir, skor tutarsın. Kurs sonunda kendi küçük oyunlarını yapar, mantık kurmayı ve adım adım çözmeyi öğrenirsin. Bu temel, ileride gerçek programlama dillerine geçişi kolaylaştırır.",
    projects: [
      "Labirent Oyunu",
      "Sesle Çalışan Karakter",
      "Skor Tutan Platform",
      "Renk Sensörü Simülasyonu",
      "Engelden Kaçan Robot Mantığı",
    ],
    image: "/images/scratch.png",
  },
];

export default function CodeGAcademy() {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");

  // Ziyaret ping (oturum başına 1 kez)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sessionStorage.getItem("ta_pinged")) {
      sessionStorage.setItem("ta_pinged", "1");
      fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "enter", path: window.location.pathname }),
      }).catch(() => {});
    }
    const onLeave = () => {
      const data = new Blob(
        [JSON.stringify({ event: "leave", path: window.location.pathname })],
        { type: "application/json" }
      );
      navigator.sendBeacon("/api/visit", data);
    };
    window.addEventListener("pagehide", onLeave);
    return () => window.removeEventListener("pagehide", onLeave);
  }, []);

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
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200 text-slate-900 py-6 md:py-10 overflow-hidden font-sans pb-[env(safe-area-inset-bottom)]">
      {/* Ana içerik */}
      <div className={`transition-all duration-500 ${selected ? "filter blur-md scale-[0.98]" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-slate-800">
            CodeG ACADEMY Yazılım Kursları
          </h1>

          {/* Kurs Kartları */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 justify-items-center">
            {COURSES.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                className="group relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden w-full max-w-[260px] h-52 md:h-64 flex flex-col justify-end items-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute top-0 left-0 w-full h-full object-contain p-3 md:p-4 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="bg-indigo-600 px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-white hover:bg-indigo-700 shadow text-sm md:text-base">
                    Detayları Gör
                  </button>
                </div>
                <div className="bg-gray-50 w-full text-center py-1.5 md:py-2 font-semibold text-slate-800 z-20 text-xs md:text-sm">
                  {c.title}
                </div>
              </div>
            ))}
          </div>

          {/* Eğitmenler + İletişim */}
          <section className="relative mt-10 md:mt-12 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">Eğitmenler</h2>

            <div className="relative mt-3 inline-flex md:inline-block items-center md:items-start flex-col md:flex-none">
              {/* Mobil: sağ padding yok, Desktop: büyük buton için sağ boşluk */}
              <div className="space-y-1 md:pr-72">
                <p className="text-indigo-700 font-semibold text-base md:text-lg">
                  Elektrik Elektronik Mühendisi Enes Torlak
                </p>
                <p className="text-indigo-700 font-semibold text-base md:text-lg">
                  Yazılım Mühendisi Ahmet Naim Torlak
                </p>
              </div>

              {/* İletişim butonu — Desktop sağa hizalı, Mobilde altta & ortada büyük */}
              <button
                onClick={() => setShowModal(true)}
                aria-label="İletişime Geç"
                className="
                  md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2
                  mt-4 md:mt-0
                  w-20 h-20 md:w-24 md:h-24
                  rounded-full bg-white border border-indigo-200 shadow-2xl hover:bg-indigo-50
                  focus:outline-none focus:ring-4 focus:ring-indigo-300
                  flex items-center justify-center self-center md:self-auto
                "
              >
                <img
                  src="/images/contact.png"
                  alt="İletişime Geç"
                  className="h-12 w-auto md:h-16 object-contain"
                />
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* (Opsiyonel) Mobil uçan İletişim butonu — sadece küçük ekranlarda */}
      <button
        onClick={() => setShowModal(true)}
        aria-label="İletişime Geç (Mobil FAB)"
        className="md:hidden fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-indigo-600 shadow-xl hover:bg-indigo-700 active:scale-95 transition flex items-center justify-center"
      >
        <img src="/images/contact.png" alt="İletişim" className="h-8 w-auto invert-0" />
      </button>

      {/* Kurs Detay Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              bg-white rounded-2xl shadow-2xl
              w-[92%] md:w-[90%] max-w-3xl
              border border-indigo-100 relative animate-slideFadeIn
              max-h-[85vh] overflow-y-auto
            "
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2.5 right-3 text-slate-500 text-2xl hover:text-slate-700"
            >
              ✕
            </button>

            <div className="p-4 md:p-8">
              <div className="flex justify-center mb-4 md:mb-6">
                <img
                  src={selected?.image}
                  alt={selected?.title}
                  className="w-full max-w-lg h-[220px] md:h-[300px] object-contain rounded-lg shadow-lg bg-white p-2 md:p-3"
                />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-3 text-center">
                {selected.title}
              </h1>
              <p className="text-slate-700 text-sm md:text-base text-center mb-4">
                {selected.content}
              </p>

              <div className="bg-indigo-50 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
                <h3 className="text-indigo-700 font-semibold mb-2 text-center">
                  Örnek Projeler:
                </h3>
                <ul className="list-none text-slate-700 space-y-1 text-center text-sm md:text-base">
                  {selected.projects.map((proj, i) => (
                    <li key={i}>{proj}</li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-center text-slate-500 mb-3 md:mb-4">
                🎓 Katılım Sertifikası verilecektir.
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-indigo-600 text-white rounded-lg py-2.5 md:py-3 font-semibold hover:bg-indigo-700 transition"
              >
                📩 İletişime Geç
              </button>
            </div>
          </div>
        </div>
      )}

      {/* İletişim Modalı */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="
              bg-white rounded-xl shadow-2xl w-[92%] max-w-md animate-slideFadeIn
              max-h-[85vh] overflow-y-auto
              p-4 md:p-6
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg md:text-xl font-semibold text-indigo-700 mb-2 text-center">
              İletişim
            </h2>

            <p className="text-center text-slate-500 text-xs md:text-sm mb-3">
              Kurs: <span className="font-medium">{selected ? selected.title : "Belirtilmedi"}</span>
            </p>

            <div className="text-center text-slate-700 mb-4 space-y-1 text-sm md:text-base">
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
                rows={3}
                required
                className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-slate-900"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white rounded-lg py-2.5 font-semibold hover:bg-indigo-700"
              >
                Mesaj Gönder
              </button>
              {status && (
                <p className="text-center text-indigo-700 font-medium mt-2">{status}</p>
              )}
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
          from {
            opacity: 0;
            transform: translateY(-25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideFadeIn {
          animation: slideFadeIn 0.45s ease forwards;
        }
      `}</style>
    </div>
  );
}
