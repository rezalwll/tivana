import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "سبد درخواست خرید",
  description: "مرور محصولات انتخاب‌شده و آماده‌کردن درخواست خرید از تیوانا.",
  robots: { index: false, follow: true },
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return children;
}
