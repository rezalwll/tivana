import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "تماس و مشاوره",
  description: "ثبت درخواست مشاوره برای انتخاب محصول، سایز، بودجه و سفارش سفارشی تیوانا.",
  alternates: { canonical: "/contact" },
};

type ContactLayoutProps = {
  children: ReactNode;
};

export default function ContactLayout({ children }: ContactLayoutProps) {
  return <>{children}</>;
}
