import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "گالری طلا تیوانا",
  description: "خرید آنلاین طلا و جواهرات لوکس از گالری تیوانا",
  icons: {
    icon: '/images/tivanalogo.png',
    shortcut: '/images/tivanalogo.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-ivory text-slate-800 antialiased">
        {/* لایه اصلی سایت با ناوبری و فوتر مشترک */}
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-28 lg:pt-32">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
