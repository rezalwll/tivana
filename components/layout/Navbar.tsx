'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "زنانه", href: "#" },
  { label: "مردانه", href: "#" },
  { label: "بچه‌گانه", href: "#" },
  { label: "گوشواره", href: "#" },
  { label: "گردنبند", href: "#" },
  { label: "دستبند", href: "#" },
  { label: "انگشتر", href: "#" },
  { label: "شمش پارسیان", href: "#" },
  { label: "داستان برند", href: "#brand-story" },
  { label: "تماس با ما", href: "/contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // کنترل وضعیت اسکرول برای تغییر حالت ظاهری
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rowClasses = scrolled
    ? "bg-white text-slate-900 shadow-lg shadow-black/5"
    : "bg-transparent text-white";

  const topBarClasses = scrolled
    ? "bg-white/95 text-slate-900 border-b border-slate-200/60"
    : "bg-transparent text-white";

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      {/* نوار اطلاع‌رسانی بالا */}
      <div className={`${topBarClasses} px-4 py-2 text-center text-xs transition-colors duration-300`}>
        قیمت روز طلا: ۱۲٬۸۴۰٬۰۰۰ تومان | شعب حضوری گالری طلا
      </div>

      {/* ردیف اصلی ناوبری */}
      <div className={`mx-auto flex max-w-6xl items-center justify-between px-4 py-4 transition-colors duration-300 ${rowClasses} supports-[backdrop-filter]:backdrop-blur-sm`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-wide">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold text-gold">
              ♛
            </span>
            <span>TAJ</span>
          </div>
        </div>

        <ul className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="transition hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* آیکن‌ها و منوی موبایل */}
        <div className="flex items-center gap-4">
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-current/20 transition hover:border-gold hover:text-gold sm:flex"
            aria-label="جستجو"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m15.5 15.5 3 3m-1.5-6a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
            </svg>
          </button>

          <Link
            href="#"
            className="hidden items-center gap-2 text-sm font-medium transition hover:text-gold lg:flex"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM5 21a7 7 0 0 1 14 0" />
            </svg>
            <span>ورود / عضویت</span>
          </Link>

          <Link href="#" className="relative hidden items-center lg:flex" aria-label="سبد خرید">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition hover:text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h18l-1.5 12h-15L3 5Z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 11v4m4-4v4M9 5 7.5 3m7 2L17 3" />
            </svg>
            <span className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy">
              2
            </span>
          </Link>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="باز کردن منو"
          >
            <span className="sr-only">منو</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-current"></span>
              <span className="block h-0.5 w-4 bg-current"></span>
              <span className="block h-0.5 w-5 bg-current"></span>
            </div>
          </button>
        </div>
      </div>

      {/* منوی موبایل بازشو */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <ul className="space-y-3 text-sm font-medium text-slate-800">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2 transition hover:bg-ivory"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-3 px-3 pt-2 text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM5 21a7 7 0 0 1 14 0" />
              </svg>
              <span>ورود / عضویت</span>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
