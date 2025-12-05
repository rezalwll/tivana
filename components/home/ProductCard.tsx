'use client';

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [favorite, setFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);

  // فرمت قیمت به صورت ریال ایران
  const priceLabel = useMemo(
    () => new Intl.NumberFormat("fa-IR").format(product.price),
    [product.price]
  );

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow shadow-black/5 transition hover:-translate-y-1 hover:shadow-luxe">
      {/* بخش تصویر محصول */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.tags?.length ? (
          <div className="absolute right-3 top-3 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-gold backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <button
            onClick={() => setFavorite((prev) => !prev)}
            aria-pressed={favorite}
            aria-label="افزودن به علاقه‌مندی"
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-sm font-semibold transition hover:bg-white ${
              favorite ? "text-gold" : "text-slate-800"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill={favorite ? "#d4af37" : "none"} stroke="currentColor" strokeWidth={1.5}>
              <path d="M12 21s-6.5-3.6-9-9a5.2 5.2 0 0 1 9-4 5.2 5.2 0 0 1 9 4c-2.5 5.4-9 9-9 9Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => setInCart((prev) => !prev)}
            aria-pressed={inCart}
            aria-label="افزودن به سبد"
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-sm font-semibold transition hover:bg-white ${
              inCart ? "text-gold" : "text-slate-800"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h18l-1.5 12h-15L3 5Z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 11v4m4-4v4M9 5 7.5 3m7 2L17 3" />
            </svg>
          </button>
        </div>
      </div>

      {/* مشخصات محصول */}
      <div className="space-y-2 px-4 py-4">
        <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
        <p className="text-sm text-slate-500">طلا ۱۸ عیار · گالری تیوانا</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-navy">
            {priceLabel} <span className="text-sm font-normal text-slate-500">تومان</span>
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              inCart ? "bg-gold/15 text-gold" : "bg-ivory text-slate-600"
            }`}
          >
            {inCart ? "در سبد" : "افزودن"}
          </span>
        </div>
      </div>
    </div>
  );
}
