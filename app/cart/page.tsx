"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { businessContact, createWhatsAppUrl } from "@/config/business";

const money = (value: number) => `${new Intl.NumberFormat("fa-IR").format(value)} تومان`;

export default function CartPage() {
  const { isReady, items, subtotal, totalItems, removeItem, setItemQuantity } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const submitRequest = async (event: FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 3 || !/^09\d{9}$/.test(phone.trim())) {
      setError("نام کامل و شماره موبایل معتبر را وارد کنید.");
      return;
    }
    setError("");
    const lines = items.map(({ product, quantity }) => `${product.name} (${product.code}) × ${quantity}`).join("\n");
    const text = `درخواست خرید از تیوانا\nنام: ${name}\nموبایل: ${phone}\n\n${lines}\n\nجمع کاتالوگ: ${money(subtotal)}\nتوضیحات: ${note || "—"}`;
    const whatsappUrl = createWhatsAppUrl(text);
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setNotice("درخواست برای ارسال به واتساپ رسمی تیوانا آماده شد. ثبت قطعی پس از تأیید گالری انجام می‌شود.");
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({ title: "درخواست خرید تیوانا", text });
        setNotice("درخواست برای اشتراک‌گذاری آماده شد. ثبت قطعی پس از تأیید مستقیم گالری انجام می‌شود.");
      } else {
        await navigator.clipboard.writeText(text);
        setNotice("متن درخواست کپی شد. آن را در راه ارتباطی رسمی تیوانا ارسال کنید.");
      }
    } catch (shareError) {
      if ((shareError as Error).name !== "AbortError") setNotice("اشتراک‌گذاری خودکار انجام نشد؛ دوباره تلاش کنید.");
    }
  };

  if (!isReady) return <div className="mx-auto max-w-6xl px-4 py-20 text-center text-sm text-slate-500">در حال بارگذاری سبد...</div>;
  if (!items.length) return <div className="mx-auto max-w-3xl px-4 py-20 text-center" dir="rtl"><div className="rounded-[2.5rem] bg-white p-10"><h1 className="text-2xl font-bold text-navy">سبد درخواست شما خالی است</h1><p className="mt-3 text-sm text-slate-500">مدل‌های موردعلاقه‌تان را اضافه کنید تا یک‌جا برای بررسی موجودی و قیمت بفرستید.</p><Link href="/shop" className="mt-7 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white">مشاهده فروشگاه</Link></div></div>;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24" dir="rtl">
      <header className="mb-8 rounded-[2.5rem] bg-navy px-7 py-10 text-white sm:px-12"><p className="text-xs font-semibold text-gold">درخواست خرید</p><h1 className="mt-3 text-3xl font-bold">سبد انتخاب‌های شما</h1><p className="mt-3 text-sm text-slate-300">{new Intl.NumberFormat("fa-IR").format(totalItems)} مورد برای استعلام موجودی و قیمت نهایی</p></header>
      <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
        <section className="space-y-4">
          {items.map(({ product, quantity, lineTotal }) => (
            <article key={product.id} className="grid grid-cols-[92px_1fr] gap-4 rounded-[1.5rem] bg-white p-4 sm:grid-cols-[120px_1fr]">
              <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden rounded-xl bg-ivory"><Image src={product.image} alt={product.name} fill sizes="120px" className="object-cover" /></Link>
              <div className="flex flex-col justify-between gap-4 py-1"><div className="flex justify-between gap-3"><div><Link href={`/product/${product.id}`} className="font-semibold text-navy hover:text-gold">{product.name}</Link><p className="mt-1 text-xs text-slate-400">{product.code} · {new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 2 }).format(product.weight)} گرم</p></div><button type="button" onClick={() => removeItem(product.id)} className="text-xs text-slate-400 hover:text-red-500">حذف</button></div><div className="flex flex-wrap items-end justify-between gap-3"><div className="inline-flex items-center rounded-full border border-slate-200"><button type="button" onClick={() => setItemQuantity(product.id, quantity - 1)} aria-label={`کاهش تعداد ${product.name}`} className="px-3 py-1.5">−</button><span className="min-w-8 text-center text-sm" aria-live="polite">{new Intl.NumberFormat("fa-IR").format(quantity)}</span><button type="button" onClick={() => setItemQuantity(product.id, quantity + 1)} aria-label={`افزایش تعداد ${product.name}`} className="px-3 py-1.5">+</button></div><p className="text-sm font-bold text-navy">{money(lineTotal)}</p></div></div>
            </article>
          ))}
        </section>

        <aside className="h-fit rounded-[2rem] bg-white p-6 sm:p-8 lg:sticky lg:top-28">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5"><span className="text-sm text-slate-500">جمع قیمت کاتالوگ</span><strong className="text-lg text-navy">{money(subtotal)}</strong></div>
          <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-6 text-amber-900">این مبلغ قابل پرداخت نیست. قیمت نهایی پس از بررسی موجودی، وزن دقیق و نرخ روز اعلام می‌شود.</p>
          <form onSubmit={submitRequest} className="mt-6 space-y-4" noValidate>
            <label className="block text-xs font-semibold text-slate-600">نام و نام خانوادگی<input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? "cart-form-error" : undefined} className="mt-2 w-full rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-sm outline-none focus:border-gold" /></label>
            <label className="block text-xs font-semibold text-slate-600">شماره موبایل<input type="tel" dir="ltr" inputMode="numeric" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0912xxxxxxx" aria-invalid={Boolean(error)} aria-describedby={error ? "cart-form-error" : undefined} className="mt-2 w-full rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-left text-sm outline-none focus:border-gold" /></label>
            <label className="block text-xs font-semibold text-slate-600">توضیحات (اختیاری)<textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-sm outline-none focus:border-gold" placeholder="سایز، رنگ یا سؤال شما..." /></label>
            {error ? <p id="cart-form-error" role="alert" className="text-xs text-red-500">{error}</p> : null}
            <button type="submit" className="w-full rounded-full bg-navy px-5 py-4 text-sm font-bold text-white transition hover:bg-gold hover:text-navy">{businessContact.whatsappNumber ? "ارسال درخواست در واتساپ" : "آماده‌کردن درخواست"}</button>
            {notice ? <p role="status" aria-live="polite" className="rounded-xl bg-gold/10 p-3 text-xs leading-6 text-navy">{notice}</p> : null}
          </form>
        </aside>
      </div>
    </div>
  );
}
