"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { useFavorites } from "@/components/favorites/FavoritesProvider";

export default function ProductActions({ productId }: { productId: string }) {
  const { addItem, getItemQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const quantity = getItemQuantity(productId);
  const favorite = isFavorite(productId);

  return (
    <div className="space-y-3">
      {quantity ? (
        <Link href="/cart" className="flex w-full items-center justify-center rounded-full bg-gold px-6 py-4 text-sm font-bold text-navy transition hover:bg-[#e4c766]">
          مشاهده سبد درخواست ({new Intl.NumberFormat("fa-IR").format(quantity)})
        </Link>
      ) : (
        <button type="button" onClick={() => addItem(productId)} className="w-full rounded-full bg-navy px-6 py-4 text-sm font-bold text-white transition hover:bg-gold hover:text-navy">
          افزودن به درخواست خرید
        </button>
      )}
      <button type="button" onClick={() => toggleFavorite(productId)} aria-pressed={favorite} className="w-full rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-gold hover:text-gold">
        {favorite ? "حذف از علاقه‌مندی‌ها" : "ذخیره در علاقه‌مندی‌ها"}
      </button>
    </div>
  );
}
