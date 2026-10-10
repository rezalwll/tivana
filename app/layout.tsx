import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartProvider from "@/components/cart/CartProvider";
import FavoritesProvider from "@/components/favorites/FavoritesProvider";
import JsonLd from "@/components/seo/JsonLd";
import { businessContact } from "@/config/business";
import { absoluteUrl, siteConfig, siteUrl } from "@/lib/site";

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
  metadataBase: new URL(siteUrl),
  title: { default: "گالری طلای تیوانا", template: "%s | تیوانا" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  keywords: ["گالری طلا", "طلای ۱۸ عیار", "گردنبند طلا", "گوشواره طلا", "انگشتر طلا", "دستبند طلا", "تیوانا"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "گالری طلای تیوانا",
    description: "زیورآلات طلای ۱۸ عیار با طراحی مینیمال؛ مشاهده مشخصات و ثبت درخواست خرید.",
    siteName: "تیوانا",
    locale: "fa_IR",
    type: "website",
    url: "/",
    images: [{ url: "/images/main-section-bg.webp", width: 1536, height: 1024, alt: "گالری طلای تیوانا" }],
  },
  twitter: { card: "summary_large_image", title: "گالری طلای تیوانا", description: "درخشش ساده، انتخاب ماندگار", images: ["/images/main-section-bg.webp"] },
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
        <a
          href="#main-content"
          className="fixed right-4 top-3 z-[100] -translate-y-24 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition focus:translate-y-0"
        >
          رفتن به محتوای اصلی
        </a>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: absoluteUrl("/"),
              logo: absoluteUrl("/images/tivanalogo.png"),
              ...(businessContact.phone ? { telephone: businessContact.phone } : {}),
              ...(businessContact.email ? { email: businessContact.email } : {}),
              ...(businessContact.city ? {
                address: {
                  "@type": "PostalAddress",
                  addressLocality: businessContact.city,
                  addressCountry: "IR",
                },
              } : {}),
              ...(businessContact.instagramUrl ? { sameAs: [businessContact.instagramUrl] } : {}),
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              alternateName: siteConfig.shortName,
              url: absoluteUrl("/"),
              inLanguage: "fa-IR",
            },
          ]}
        />
        <CartProvider>
          <FavoritesProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main id="main-content" className="flex-1 pt-28 lg:pt-32">{children}</main>
              <Footer />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
