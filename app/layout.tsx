import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartProvider from "@/components/cart/CartProvider";
import FavoritesProvider from "@/components/favorites/FavoritesProvider";

const iranYekan = localFont({
  src: [
    {
      path: "../public/fonts/iranyekan.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/iranyekan.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-iranyekan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "گالری طلا تیوانا",
  description: "خرید آنلاین طلا و جواهرات لوکس از گالری تیوانا",
  icons: {
    icon: "/images/tivanalogo.png",
    shortcut: "/images/tivanalogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranYekan.variable} bg-ivory text-slate-800 antialiased`}>
        <CartProvider>
          <FavoritesProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 pt-28 lg:pt-32">{children}</main>
              <Footer />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
