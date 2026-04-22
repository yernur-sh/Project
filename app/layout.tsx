// app/layout.tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Montserrat-ты шақыру
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Шрифті баптау
const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"], // Қазақ тілі үшін cyrillic міндетті
  weight: ["400", "500", "600", "700", "800"], // Қажетті қалыңдықтар
  variable: "--font-montserrat", // CSS айнымалысы ретінде
});

export const metadata: Metadata = {
  title: "EcoLife KZ — Қызылорда",
  description: "Қызылорда қаласының экологиялық порталы",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kk">
      {/* className бөлігіне montserrat.className қосамыз */}
      <body className={`${montserrat.className} bg-gray-50 text-gray-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}