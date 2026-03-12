"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart/CartProvider";
import { useFavorites } from "@/components/favorites/FavoritesProvider";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addItem, getItemQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(product.id);
  const quantityInCart = getItemQuantity(product.id);
  const inCart = quantityInCart > 0;

  const priceLabel = useMemo(
    () => new Intl.NumberFormat("fa-IR").format(product.price),
    [product.price]
  );

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow shadow-black/5 transition ">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="h-full w-full object-cover transition duration-500"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <button
            onClick={() => toggleFavorite(product.id)}
            aria-pressed={favorite}
            aria-label={favorite ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-sm font-semibold transition hover:bg-white ${favorite ? "text-gold" : "text-gold"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill={favorite ? "#d4af37" : "none"}
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                d="M12 21s-6.5-3.6-9-9a5.2 5.2 0 0 1 9-4 5.2 5.2 0 0 1 9 4c-2.5 5.4-9 9-9 9Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={() => addItem(product.id)}
            aria-label={inCart ? "افزایش تعداد در سبد" : "افزودن به سبد"}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/85 transition hover:bg-white ${inCart ? "text-gold" : "text-slate-800"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </button>
        </div>
      </div>

      <div className="space-y-2 px-4 py-4">
        <h3 className="line-clamp-1 text-base font-semibold text-slate-900">{product.name}</h3>
        <p className="text-sm text-slate-500">طلای 18 عیار · گالری تیوانا</p>

        <div className="flex items-center justify-between gap-2 pt-2">
          <span className="text-lg font-semibold text-navy">
            {priceLabel} <span className="text-sm font-normal text-slate-500">تومان</span>
          </span>

          {inCart ? (
            <Link
              href="/cart"
              className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold transition hover:bg-gold/20"
            >
              در سبد ({new Intl.NumberFormat("fa-IR").format(quantityInCart)})
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => addItem(product.id)}
              className="rounded-full bg-ivory px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-gold/10 hover:text-gold"
            >
              افزودن
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
