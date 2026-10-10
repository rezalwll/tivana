"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { businessContact, createWhatsAppUrl } from "@/config/business";

type FormState = { name: string; phone: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = { name: "", phone: "", subject: "مشاوره خرید", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [notice, setNotice] = useState("");

  const setField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setNotice("");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const next: FormErrors = {};
    if (form.name.trim().length < 3) next.name = "نام و نام خانوادگی را کامل وارد کنید.";
    if (!/^09\d{9}$/.test(form.phone.trim())) next.phone = "شماره موبایل معتبر وارد کنید.";
    if (form.message.trim().length < 10) next.message = "لطفاً درخواست خود را کمی کامل‌تر بنویسید.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const text = `درخواست از سایت تیوانا\nنام: ${form.name}\nموبایل: ${form.phone}\nموضوع: ${form.subject}\nپیام: ${form.message}`;
    const whatsappUrl = createWhatsAppUrl(text);
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setNotice("درخواست برای ارسال به واتساپ رسمی تیوانا آماده شد.");
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({ title: "درخواست مشاوره تیوانا", text });
        setNotice("پیام برای اشتراک‌گذاری آماده شد.");
      } else {
        await navigator.clipboard.writeText(text);
        setNotice("متن درخواست کپی شد؛ آن را در راه ارتباطی رسمی تیوانا ارسال کنید.");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") setNotice("امکان اشتراک‌گذاری خودکار نبود؛ لطفاً متن را کپی کنید.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24" dir="rtl">
      <header className="mb-10 rounded-[2.5rem] bg-navy px-7 py-12 text-white sm:px-12">
        <p className="text-xs font-semibold text-gold">CONTACT TIVANA</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">برای انتخاب بهتر، همراهتان هستیم</h1>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300">برای مشاوره مدل، سایز، بودجه یا سفارش سفارشی، اطلاعات زیر را کامل کنید. پیام آماده می‌شود تا از طریق پیام‌رسان دلخواهتان به راه ارتباطی رسمی گالری ارسال کنید.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] bg-white p-6 shadow-sm sm:p-9" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-navy">نام و نام خانوادگی *<input autoComplete="name" value={form.name} onChange={(e) => setField("name", e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} className="mt-2 w-full rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-sm font-normal outline-none focus:border-gold" />{errors.name ? <span id="contact-name-error" role="alert" className="mt-2 block text-xs text-red-500">{errors.name}</span> : null}</label>
            <label className="text-sm font-semibold text-navy">شماره موبایل *<input type="tel" dir="ltr" inputMode="numeric" autoComplete="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="0912xxxxxxx" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} className="mt-2 w-full rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-left text-sm font-normal outline-none focus:border-gold" />{errors.phone ? <span id="contact-phone-error" role="alert" className="mt-2 block text-xs text-red-500">{errors.phone}</span> : null}</label>
          </div>
          <label className="block text-sm font-semibold text-navy">موضوع<select value={form.subject} onChange={(e) => setField("subject", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-sm font-normal outline-none focus:border-gold"><option>مشاوره خرید</option><option>انتخاب سایز</option><option>سفارش سفارشی</option><option>پیگیری درخواست</option><option>سایر</option></select></label>
          <label className="block text-sm font-semibold text-navy">توضیحات *<textarea rows={6} value={form.message} onChange={(e) => setField("message", e.target.value)} placeholder="نام یا کد محصول و سؤال خود را بنویسید..." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-sm font-normal leading-7 outline-none focus:border-gold" />{errors.message ? <span id="contact-message-error" role="alert" className="mt-2 block text-xs text-red-500">{errors.message}</span> : null}</label>
          <button type="submit" className="w-full rounded-full bg-navy px-6 py-4 text-sm font-bold text-white transition hover:bg-gold hover:text-navy">{businessContact.whatsappNumber ? "ارسال درخواست در واتساپ" : "آماده‌کردن پیام"}</button>
          {notice ? <p role="status" aria-live="polite" className="rounded-xl bg-gold/10 px-4 py-3 text-xs leading-6 text-navy">{notice}</p> : null}
        </form>

        <aside className="space-y-5">
          {businessContact.hasDirectChannel ? (
            <div className="rounded-[2rem] bg-white p-7 sm:p-9">
              <p className="text-xs font-semibold text-gold">راه‌های ارتباطی رسمی</p>
              <div className="mt-5 flex flex-col items-start gap-3 text-sm font-semibold text-navy">
                {businessContact.phone ? <a dir="ltr" href={`tel:${businessContact.phone}`} className="hover:text-gold">{businessContact.phone}</a> : null}
                {businessContact.whatsappNumber ? <a href={`https://wa.me/${businessContact.whatsappNumber}`} target="_blank" rel="noreferrer" className="hover:text-gold">واتساپ تیوانا ←</a> : null}
                {businessContact.instagramUrl ? <a dir="ltr" href={businessContact.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-gold">@{businessContact.instagramHandle}</a> : null}
                {businessContact.email ? <a dir="ltr" href={`mailto:${businessContact.email}`} className="break-all hover:text-gold">{businessContact.email}</a> : null}
                {businessContact.city ? <span className="font-normal text-slate-500">{businessContact.city}</span> : null}
              </div>
            </div>
          ) : null}
          <div className="rounded-[2rem] bg-[#e9dfcc] p-7 sm:p-9"><p className="text-xs font-semibold text-gold">پیش از پیام</p><h2 className="mt-3 text-2xl font-bold text-navy">این اطلاعات کمک می‌کند سریع‌تر پاسخ بگیرید</h2><ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600"><li>• نام یا کد محصول</li><li>• سایز یا رنگ موردنظر</li><li>• شهر مقصد</li><li>• بازه بودجه تقریبی</li></ul></div>
          <div className="rounded-[2rem] bg-white p-7 sm:p-9"><h2 className="text-lg font-bold text-navy">پاسخ پرسش‌های رایج</h2><p className="mt-3 text-sm leading-7 text-slate-500">درباره قیمت روز، وزن، روند ثبت درخواست و ارسال، پاسخ‌های آماده را ببینید.</p><div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-gold"><Link href="/faq">پرسش‌های متداول ←</Link><Link href="/guide">راهنمای سایز ←</Link></div></div>
        </aside>
      </div>
    </div>
  );
}
