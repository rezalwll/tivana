"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/home/ProductCard";
import { categories, products } from "@/data/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "weight-asc";

export default function ShopGrid() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim();
    const list = products.filter((product) => {
      const categoryMatches = category === "all" || product.category === category;
      const queryMatches = !normalized || product.name.includes(normalized) || product.code.toLowerCase().includes(normalized.toLowerCase());
      return categoryMatches && queryMatches;
    });

    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "weight-asc") return a.weight - b.weight;
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [category, query, sort]);

  return (
    <div>
      <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="relative block">
            <span className="sr-only">جست‌وجوی محصول</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجو با نام یا کد محصول..." className="w-full rounded-full border border-slate-200 bg-ivory px-5 py-3 text-sm outline-none transition focus:border-gold" />
          </label>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-navy outline-none focus:border-gold" aria-label="دسته‌بندی">
            <option value="all">همه دسته‌ها</option>
            {categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
          </select>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-navy outline-none focus:border-gold" aria-label="مرتب‌سازی">
            <option value="featured">پیشنهاد تیوانا</option>
            <option value="price-asc">کمترین قیمت</option>
            <option value="price-desc">بیشترین قیمت</option>
            <option value="weight-asc">کمترین وزن</option>
          </select>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between text-sm text-slate-500">
        <p aria-live="polite"><span className="font-semibold text-navy">{new Intl.NumberFormat("fa-IR").format(visible.length)}</span> محصول</p>
        {(query || category !== "all") ? <button type="button" onClick={() => { setQuery(""); setCategory("all"); }} className="text-xs font-semibold text-gold">پاک‌کردن فیلترها</button> : null}
      </div>

      {visible.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <div className="rounded-[2rem] bg-white px-6 py-16 text-center"><h2 className="font-bold text-navy">محصولی پیدا نشد</h2><p className="mt-2 text-sm text-slate-500">عبارت جست‌وجو یا دسته‌بندی را تغییر دهید.</p></div>
      )}
    </div>
  );
}
