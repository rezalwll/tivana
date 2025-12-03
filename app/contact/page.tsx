'use client';

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    subject: "مشاوره خرید",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // اعتبارسنجی داده‌های فرم
  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = "نام و نام خانوادگی الزامی است.";
    }
    if (!form.phone.trim()) {
      nextErrors.phone = "شماره موبایل را وارد کنید.";
    } else if (!/^\d{10,11}$/.test(form.phone.trim())) {
      nextErrors.phone = "شماره موبایل نامعتبر است.";
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "ایمیل وارد شده صحیح نیست.";
    }
    if (!form.message.trim()) {
      nextErrors.message = "متن پیام را بنویسید.";
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 space-y-3 text-center">
        <p className="text-sm font-semibold text-gold">همراه شما هستیم</p>
        <h1 className="text-3xl font-bold text-navy">تماس با گالری طلا</h1>
        <p className="text-base text-slate-600">
          برای مشاوره خرید، پیگیری سفارش یا همکاری، پیام خود را برای ما ارسال کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* فرم تماس */}
        <div className="rounded-3xl bg-white p-8 shadow shadow-black/5">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="name">
                نام و نام خانوادگی *
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-sm text-slate-800 outline-none ring-gold/30 transition focus:border-gold focus:ring-2"
                placeholder="مثال: نیلوفر تاجیک"
              />
              {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="phone">
                شماره موبایل *
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-sm text-slate-800 outline-none ring-gold/30 transition focus:border-gold focus:ring-2"
                placeholder="مثال: 09121234567"
              />
              {errors.phone && <p className="mt-2 text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="email">
                ایمیل (اختیاری)
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-sm text-slate-800 outline-none ring-gold/30 transition focus:border-gold focus:ring-2"
                placeholder="نمونه: name@example.com"
              />
              {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="subject">
                موضوع
              </label>
              <select
                id="subject"
                value={form.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-sm text-slate-800 outline-none ring-gold/30 transition focus:border-gold focus:ring-2"
              >
                <option value="مشاوره خرید">مشاوره خرید</option>
                <option value="انتقاد و پیشنهاد">انتقاد و پیشنهاد</option>
                <option value="همکاری">همکاری</option>
                <option value="سایر">سایر</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="message">
                متن پیام *
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-ivory px-4 py-3 text-sm text-slate-800 outline-none ring-gold/30 transition focus:border-gold focus:ring-2"
                placeholder="پیام خود را بنویسید..."
              />
              {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-navy/90"
            >
              ارسال پیام
            </button>

            {submitted && (
              <div className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-navy">
                پیام شما با موفقیت ثبت شد. کارشناسان ما در اسرع وقت با شما تماس می‌گیرند.
              </div>
            )}
          </form>
        </div>

        {/* اطلاعات شعب */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-navy p-8 text-white shadow shadow-black/10">
            <h2 className="text-2xl font-bold text-gold">شعب حضوری گالری</h2>
            <p className="mt-2 text-sm text-slate-200">
              برای بازدید حضوری و دریافت مشاوره اختصاصی به نزدیک‌ترین شعبه مراجعه کنید.
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-100">
              <div>
                <p className="font-semibold text-gold">شعبه ولیعصر</p>
                <p>تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۳</p>
                <p>تلفن: ۰۲۱-۴۱۲۳۴ | ساعت کاری: ۱۰ الی ۲۰</p>
              </div>
              <div>
                <p className="font-semibold text-gold">شعبه فرشته</p>
                <p>تهران، خیابان فرشته، نبش خیابان بیدار، پلاک ۳۲</p>
                <p>تلفن: ۰۲۱-۴۵۶۷۸ | ساعت کاری: ۱۱ الی ۲۱</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow shadow-black/5">
            <div className="mb-3 flex h-48 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-ivory/60 text-navy">
              محل شعبه روی نقشه
            </div>
            <p className="font-semibold text-navy">محل شعبه روی نقشه</p>
            <p className="text-xs text-slate-500">نمایش تعاملی نقشه به‌زودی در دسترس خواهد بود.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
