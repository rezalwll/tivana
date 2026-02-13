"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Category } from "@/data/products";
import { categories } from "@/data/products";

const navCategories = [
  "zananeh",
  "mardaneh",
  "kids",
  "earring",
  "necklace",
  "bracelet",
  "ring",
  "parsian",
] as const;

const navItems = [
  { label: "تماس با ما", href: "/contact" },
  ...navCategories
    .map((slug) => categories.find((cat) => cat.slug === slug))
    .filter((cat): cat is Category => Boolean(cat))
    .map((cat) => ({
      label: cat.name,
      href: `/category/${cat.slug}`,
    })),

];

const GOLD_PRICE_API_URL =
  "https://api.tgju.org/v1/market/list-data?category_ids=91818&extra_data=1&lang=fa";
const GOLD_PRICE_REFRESH_INTERVAL_MS = 10_000;

type GoldListResponse = {
  data?: unknown;
};

const parseTomanPrice = (priceHtml: string): number | null => {
  const rialDigits = priceHtml.replace(/[^\d]/g, "");
  if (!rialDigits) {
    return null;
  }

  const rialValue = Number.parseInt(rialDigits, 10);
  if (!Number.isFinite(rialValue)) {
    return null;
  }

  return Math.round(rialValue / 10);
};

const formatTomanPrice = (price: number) =>
  new Intl.NumberFormat("fa-IR").format(price);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [goldPrice, setGoldPrice] = useState<number | null>(null);
  const [isGoldPriceLoading, setIsGoldPriceLoading] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadGoldPrice = async () => {
      try {
        const response = await fetch(GOLD_PRICE_API_URL, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to fetch gold price: ${response.status}`);
        }

        const payload = (await response.json()) as GoldListResponse;
        const rows = Array.isArray(payload.data) ? payload.data : [];
        const firstRow = rows[0];
        if (!Array.isArray(firstRow) || typeof firstRow[1] !== "string") {
          throw new Error("Unexpected payload structure");
        }
        console.log(payload);

        const tomanPrice = parseTomanPrice(firstRow[1]);
        if (tomanPrice === null) {
          throw new Error("Could not parse gold price");
        }

        if (!mounted) {
          return;
        }

        setGoldPrice(tomanPrice);
      } catch (error) {
        if (!mounted) {
          return;
        }

        console.error(error);
        setGoldPrice(null);
      } finally {
        if (mounted) {
          setIsGoldPriceLoading(false);
        }
      }
    };

    loadGoldPrice();
    const timer = window.setInterval(loadGoldPrice, GOLD_PRICE_REFRESH_INTERVAL_MS);

    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, []);

  const goldPriceText = isGoldPriceLoading
    ? "\u062f\u0631 \u062d\u0627\u0644 \u062f\u0631\u06cc\u0627\u0641\u062a..."
    : goldPrice !== null
      ? `${formatTomanPrice(goldPrice)} \u062a\u0648\u0645\u0627\u0646`
      : "\u0646\u0627\u0645\u0634\u062e\u0635";

  const rightSideClasses = scrolled
    ? "bg-white text-slate-900 shadow-lg shadow-black/5"
    : "bg-transparent";
  const leftSideClasses = scrolled ? "" : "text-white";

  return (
    <nav dir="ltr" className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex items-center gap-4 px-10 py-4 transition-colors duration-300 ${rightSideClasses} supports-[backdrop-filter]:backdrop-blur-sm`}
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold tracking-wide"
        >
          <Image
            src="/images/tivanalogo.png"
            alt="Tivana logo"
            width={80}
            height={80}
            className="h-10 w-10 rounded-full object-cover"
            priority
          />
          <span className="text-base font-semibold text-gold">
            Tivana gold gallery
          </span>
        </Link>
        <Link
          href="#"
          className={`relative hidden items-center lg:flex ${leftSideClasses}`}
          aria-label="ب?ב?ب? ب?ב?ה?ב?"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transition hover:text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 5h18l-1.5 12h-15L3 5Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 11v4m4-4v4M9 5 7.5 3m7 2L17 3"
            />
          </svg>
          <span className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy">
            2
          </span>
        </Link>
        <button
          className={`${leftSideClasses} hidden items-center gap-2 rounded-full border border-current/20 px-3 py-2 text-xs font-semibold transition hover:border-gold hover:text-gold sm:flex`}
          aria-label="تغییر حالت شب"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 4.75a7.25 7.25 0 1 0 7.25 7.25A7.258 7.258 0 0 0 12 4.75Zm0 12a4.75 4.75 0 1 1 4.75-4.75A4.756 4.756 0 0 1 12 16.75Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            />
          </svg>
        </button>

        <div className="ms-auto flex items-center gap-20">
          <div
            dir="rtl"
            className="hidden text-xs font-semibold text-navy lg:flex"
          >
            {"قیمت روز طلا:"}
            <span className="mr-2">{goldPriceText}</span>
          </div>

          <ul className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="ب?ב?ב‎ ד?ב?ב?ג? ג?ג?ג?"
          >
            <span className="sr-only">ג?ג?ג?</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-current"></span>
              <span className="block h-0.5 w-4 bg-current"></span>
              <span className="block h-0.5 w-5 bg-current"></span>
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div dir="rtl" className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <div

            className="mb-3 rounded-lg bg-ivory px-3 py-2 text-sm font-semibold text-navy"
          >
            {"قیمت روز طلا:"}
            <span className="">{goldPriceText}</span>
          </div>

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
          </ul>
        </div>
      )}
    </nav>
  );
}
