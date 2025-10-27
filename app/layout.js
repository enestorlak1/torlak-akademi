import "./globals.css";

export const metadata = {
  title: "Torlak Akademi Yazılım Kursları",
  description: "Java, Python, PLC, Arduino, Web/Mobil Test otomasyon eğitimleri.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
