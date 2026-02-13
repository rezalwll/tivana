"use client";

import Link from "next/link";
import ProductCard from "@/components/home/ProductCard";
import { useCart } from "@/components/cart/CartProvider";
import { useFavorites } from "@/components/favorites/FavoritesProvider";

export default function FavoritesPage() {
  const { isReady, items, totalFavorites, clearFavorites } = useFavorites();
  const { totalItems } = useCart();

  const favoritesCount = new Intl.NumberFormat("fa-IR").format(totalFavorites);
  const cartCount = new Intl.NumberFormat("fa-IR").format(totalItems);

  if (!isReady) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm text-slate-500" dir="rtl">
        در حال بارگذاری علاقه‌مندی‌ها...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16" dir="rtl">
        <div className="rounded-3xl bg-white p-8 text-center shadow shadow-black/5">
          <h1 className="text-2xl font-bold text-navy">لیست علاقه‌مندی شما خالی است</h1>
          <p className="mt-3 text-sm text-slate-600">
            با کلیک روی آیکن قلب در محصولات، آن‌ها را به این بخش اضافه کنید.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy/90"
            >
              مشاهده محصولات
            </Link>
            <Link
              href="/cart"
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-gold hover:text-gold"
            >
              سبد خرید ({cartCount})
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 pb-16" dir="rtl">
      <div className="rounded-3xl bg-gradient-to-l from-white via-ivory to-white px-6 py-8 shadow shadow-black/5">
        <p className="text-sm font-semibold text-gold">علاقه‌مندی‌ها</p>
        <h1 className="mt-2 text-3xl font-bold text-navy">محصولات منتخب شما</h1>
        <p className="mt-2 text-sm text-slate-600">
          {favoritesCount} کالا در لیست علاقه‌مندی شما قرار دارد.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/cart"
            className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy/90"
          >
            رفتن به سبد خرید ({cartCount})
          </Link>
          <button
            type="button"
            onClick={clearFavorites}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-500"
          >
            پاک کردن همه
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

