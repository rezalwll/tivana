"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { useFavorites } from "@/components/favorites/FavoritesProvider";
import type { Category } from "@/data/products";
import { categories } from "@/data/products";

const navCategoryOrder = [
  "earring",
  "necklace",
  "bracelet",
  "ring",
  "parsian",
] as const;

const navItems = [
  ...navCategoryOrder
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter((category): category is Category => Boolean(category))
    .map((category) => ({
      label: category.name,
      href: `/category/${category.slug}`,
    })),
  { label: "تماس با ما", href: "/contact" },
];

const GOLD_PRICE_API_URL =
  "https://api.tgju.org/v1/market/list-data?category_ids=91818&extra_data=1&lang=fa";
const GOLD_PRICE_REFRESH_INTERVAL_MS = 10_000;

type GoldPriceResponse = {
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

export default function Navbar() {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
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

        const payload = (await response.json()) as GoldPriceResponse;
        const rows = Array.isArray(payload.data) ? payload.data : [];
        const firstRow = rows[0];

        if (!Array.isArray(firstRow) || typeof firstRow[1] !== "string") {
          throw new Error("Unexpected gold price payload.");
        }

        const tomanPrice = parseTomanPrice(firstRow[1]);
        if (tomanPrice === null) {
          throw new Error("Could not parse gold price.");
        }

        if (mounted) {
          setGoldPrice(tomanPrice);
        }
      } catch {
        if (mounted) {
          setGoldPrice(null);
        }
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

  const goldPriceText = useMemo(() => {
    if (isGoldPriceLoading) {
      return "در حال دریافت...";
    }
    if (goldPrice === null) {
      return "نامشخص";
    }
    return `${new Intl.NumberFormat("fa-IR").format(goldPrice)} تومان`;
  }, [goldPrice, isGoldPriceLoading]);

  const cartCount = useMemo(
    () => new Intl.NumberFormat("fa-IR").format(totalItems),
    [totalItems]
  );
  const favoritesCount = useMemo(
    () => new Intl.NumberFormat("fa-IR").format(totalFavorites),
    [totalFavorites]
  );

  const rightSideClasses = scrolled
    ? "bg-white text-slate-900 shadow-lg shadow-black/5"
    : "bg-transparent text-slate-900";
  const iconClasses = scrolled ? "text-slate-900" : "text-white";

  return (
    <nav dir="ltr" className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex items-center gap-4 px-4 py-4 transition-colors duration-300 sm:px-8 lg:px-10 ${rightSideClasses} supports-[backdrop-filter]:backdrop-blur-sm`}
      >
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-wide">
          <Image
            src="/images/tivanalogo.png"
            alt="Tivana logo"
            width={80}
            height={80}
            className="h-10 w-10 rounded-full object-cover"
            priority
          />
          <span className="hidden text-base font-semibold text-gold sm:inline">
            Tivana gold gallery
          </span>
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/favorites"
            className={`relative flex items-center ${iconClasses}`}
            aria-label="علاقه‌مندی‌ها"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition hover:text-gold"
              fill={totalFavorites > 0 ? "#d4af37" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                d="M12 21s-6.5-3.6-9-9a5.2 5.2 0 0 1 9-4 5.2 5.2 0 0 1 9 4c-2.5 5.4-9 9-9 9Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {totalFavorites > 0 ? (
              <span className="absolute -left-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gold px-1 text-xs font-bold text-navy">
                {favoritesCount}
              </span>
            ) : null}
          </Link>

          <Link
            href="/cart"
            className={`relative flex items-center ${iconClasses}`}
            aria-label="سبد خرید"
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
            {totalItems > 0 ? (
              <span className="absolute -left-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gold px-1 text-xs font-bold text-navy">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </div>

        <div className="ms-auto flex items-center gap-20 lg:gap-20">
          <div dir="rtl" className="hidden text-sm font-semibold xl:flex">
            قیمت روز طلا:
            <span className="mr-2 text-slate-900">{goldPriceText}</span>
          </div>

          <ul className="hidden items-center gap-5 text-sm font-medium lg:flex">
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
            onClick={() => setOpen((previous) => !previous)}
            aria-label="باز و بسته کردن منوی موبایل"
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

      {open ? (
        <div dir="rtl" className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <div className="mb-3 rounded-lg bg-ivory px-3 py-2 text-sm font-semibold text-navy">
            قیمت روز طلا:
            <span className="mr-2 text-gold">{goldPriceText}</span>
          </div>

          <Link
            href="/favorites"
            className="mb-2 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-navy"
            onClick={() => setOpen(false)}
          >
            <span>علاقه‌مندی‌ها</span>
            <span>{favoritesCount}</span>
          </Link>

          <Link
            href="/cart"
            className="mb-3 flex items-center justify-between rounded-lg bg-navy px-3 py-2 text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            <span>سبد خرید</span>
            <span>{cartCount}</span>
          </Link>

          <ul className="space-y-2 text-sm font-medium text-slate-800">
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
      ) : null}
    </nav>
  );
}

