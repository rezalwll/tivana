"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

type DeliveryMethod = "post" | "express" | "pickup";
type PaymentMethod = "online" | "card_to_card" | "in_person";

type CheckoutForm = {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  unit: string;
  plaque: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  note: string;
};

type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>;

const deliveryOptions: Array<{
  id: DeliveryMethod;
  title: string;
  description: string;
  cost: number;
}> = [
  { id: "post", title: "پست پیشتاز", description: "تحویل 3 تا 5 روز کاری", cost: 180_000 },
  { id: "express", title: "پیک ویژه", description: "تحویل همان‌روز در تهران", cost: 350_000 },
  { id: "pickup", title: "تحویل حضوری", description: "دریافت از گالری بدون هزینه ارسال", cost: 0 },
];

const paymentOptions: Array<{
  id: PaymentMethod;
  title: string;
  description: string;
}> = [
  { id: "online", title: "پرداخت آنلاین", description: "پرداخت امن در درگاه بانکی" },
  { id: "card_to_card", title: "کارت به کارت", description: "ارسال رسید برای تایید سفارش" },
  { id: "in_person", title: "پرداخت حضوری", description: "ویژه تحویل حضوری از فروشگاه" },
];

const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("fa-IR").format(value)} تومان`;

const initialForm: CheckoutForm = {
  fullName: "",
  phone: "",
  email: "",
  province: "",
  city: "",
  postalCode: "",
  address: "",
  unit: "",
  plaque: "",
  deliveryMethod: "post",
  paymentMethod: "online",
  note: "",
};

export default function CartPage() {
  const {
    isReady,
    items,
    subtotal,
    totalItems,
    clearCart,
    removeItem,
    setItemQuantity,
  } = useCart();

  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [orderCode, setOrderCode] = useState<string | null>(null);

  const selectedDelivery = useMemo(
    () => deliveryOptions.find((option) => option.id === form.deliveryMethod) ?? deliveryOptions[0],
    [form.deliveryMethod]
  );
  const shippingCost = selectedDelivery.cost;
  const finalTotal = subtotal + shippingCost;

  const validate = (): CheckoutErrors => {
    const nextErrors: CheckoutErrors = {};
    if (form.fullName.trim().length < 3) {
      nextErrors.fullName = "نام و نام خانوادگی را کامل وارد کنید.";
    }

    if (!/^09\d{9}$/.test(form.phone.trim())) {
      nextErrors.phone = "شماره موبایل معتبر نیست.";
    }

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "ایمیل وارد شده معتبر نیست.";
    }

    if (form.deliveryMethod !== "pickup") {
      if (!form.province.trim()) {
        nextErrors.province = "استان را انتخاب کنید.";
      }
      if (!form.city.trim()) {
        nextErrors.city = "شهر را وارد کنید.";
      }
      if (!form.address.trim()) {
        nextErrors.address = "آدرس کامل الزامی است.";
      }
      if (!/^\d{10}$/.test(form.postalCode.trim())) {
        nextErrors.postalCode = "کد پستی باید 10 رقم باشد.";
      }
    }

    if (form.paymentMethod === "in_person" && form.deliveryMethod !== "pickup") {
      nextErrors.paymentMethod =
        "پرداخت حضوری فقط برای روش تحویل حضوری قابل انتخاب است.";
    }

    return nextErrors;
  };

  const handleFieldChange = <Key extends keyof CheckoutForm>(
    key: Key,
    value: CheckoutForm[Key]
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    if (errors[key]) {
      setErrors((previous) => ({ ...previous, [key]: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) {
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const code = `${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
    setOrderCode(code);
    clearCart();
    setForm(initialForm);
  };

  if (!isReady) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-sm text-slate-500">
        در حال بارگذاری سبد خرید...
      </div>
    );
  }

  if (orderCode) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16" dir="rtl">
        <div className="rounded-3xl border border-gold/30 bg-white p-8 text-center shadow shadow-black/5">
          <p className="text-sm font-semibold text-gold">ثبت سفارش آزمایشی</p>
          <h1 className="mt-2 text-3xl font-bold text-navy">سفارش شما ثبت شد</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            کد پیگیری سفارش:
            <span className="mx-2 rounded-full bg-ivory px-3 py-1 font-semibold text-navy">
              {orderCode}
            </span>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            مجموع پرداختی: <span className="font-semibold text-navy">{formatPrice(finalTotal)}</span>
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy/90"
            >
              بازگشت به صفحه اصلی
            </Link>
            <button
              type="button"
              onClick={() => setOrderCode(null)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-gold hover:text-gold"
            >
              ثبت سفارش جدید
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16" dir="rtl">
        <div className="rounded-3xl bg-white p-8 text-center shadow shadow-black/5">
          <h1 className="text-2xl font-bold text-navy">سبد خرید شما خالی است</h1>
          <p className="mt-3 text-sm text-slate-600">
            برای ثبت سفارش، ابتدا محصولات موردنظر را به سبد خرید اضافه کنید.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy/90"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 pb-16" dir="rtl">
      <div className="rounded-3xl bg-gradient-to-l from-white via-ivory to-white px-6 py-8 shadow shadow-black/5">
        <p className="text-sm font-semibold text-gold">سبد خرید</p>
        <h1 className="mt-2 text-3xl font-bold text-navy">تکمیل سفارش</h1>
        <p className="mt-2 text-sm text-slate-600">
          {new Intl.NumberFormat("fa-IR").format(totalItems)} کالا در سبد شما قرار دارد.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-4">
          {items.map((item) => (
            <article
              key={item.product.id}
              className="grid gap-4 rounded-2xl bg-white p-4 shadow shadow-black/5 sm:grid-cols-[110px_1fr]"
            >
              <div className="relative h-28 overflow-hidden rounded-xl bg-ivory">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  sizes="(min-width: 640px) 110px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="text-base font-semibold text-navy">{item.product.name}</h2>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    className="text-xs font-semibold text-slate-500 transition hover:text-red-500"
                  >
                    حذف کالا
                  </button>
                </div>

                <p className="text-sm text-slate-500">
                  قیمت واحد: <span className="font-semibold text-slate-700">{formatPrice(item.product.price)}</span>
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center rounded-full border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setItemQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 text-lg text-slate-700 transition hover:text-gold"
                      aria-label="کاهش تعداد"
                    >
                      -
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold text-navy">
                      {new Intl.NumberFormat("fa-IR").format(item.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setItemQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 text-lg text-slate-700 transition hover:text-gold"
                      aria-label="افزایش تعداد"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-navy">{formatPrice(item.lineTotal)}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="space-y-5">
          <div className="rounded-2xl bg-white p-5 shadow shadow-black/5">
            <h3 className="text-lg font-semibold text-navy">خلاصه پرداخت</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>جمع کالاها</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>هزینه ارسال</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-navy">
                <span>مبلغ قابل پرداخت</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl bg-white p-5 shadow shadow-black/5"
            noValidate
          >
            <h3 className="text-lg font-semibold text-navy">اطلاعات سفارش</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-slate-600">نام و نام خانوادگی *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(event) => handleFieldChange("fullName", event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-ivory px-3 py-2.5 text-sm text-slate-800 outline-none ring-gold/30 focus:border-gold focus:ring-2"
                />
                {errors.fullName ? (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">شماره موبایل *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => handleFieldChange("phone", event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-ivory px-3 py-2.5 text-sm text-slate-800 outline-none ring-gold/30 focus:border-gold focus:ring-2"
                  placeholder="0912xxxxxxx"
                />
                {errors.phone ? <p className="mt-1 text-xs text-red-500">{errors.phone}</p> : null}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">ایمیل (اختیاری)</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => handleFieldChange("email", event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-ivory px-3 py-2.5 text-sm text-slate-800 outline-none ring-gold/30 focus:border-gold focus:ring-2"
                />
                {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email}</p> : null}
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className="mb-2 text-xs font-semibold text-slate-600">روش ارسال</legend>
              {deliveryOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 text-sm ${
                    form.deliveryMethod === option.id
                      ? "border-gold bg-gold/10"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-navy">{option.title}</p>
                    <p className="text-xs text-slate-500">{option.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-700">{formatPrice(option.cost)}</span>
                    <input
                      type="radio"
                      name="delivery"
                      checked={form.deliveryMethod === option.id}
                      onChange={() => handleFieldChange("deliveryMethod", option.id)}
                    />
                  </div>
                </label>
              ))}
            </fieldset>

            {form.deliveryMethod !== "pickup" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">استان *</label>
                  <input
                    type="text"
                    value={form.province}
                    onChange={(event) => handleFieldChange("province", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-ivory px-3 py-2.5 text-sm outline-none ring-gold/30 focus:border-gold focus:ring-2"
                  />
                  {errors.province ? (
                    <p className="mt-1 text-xs text-red-500">{errors.province}</p>
                  ) : null}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">شهر *</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) => handleFieldChange("city", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-ivory px-3 py-2.5 text-sm outline-none ring-gold/30 focus:border-gold focus:ring-2"
                  />
                  {errors.city ? <p className="mt-1 text-xs text-red-500">{errors.city}</p> : null}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-slate-600">آدرس کامل *</label>
                  <textarea
                    rows={3}
                    value={form.address}
                    onChange={(event) => handleFieldChange("address", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-ivory px-3 py-2.5 text-sm outline-none ring-gold/30 focus:border-gold focus:ring-2"
                  />
                  {errors.address ? (
                    <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                  ) : null}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">پلاک</label>
                  <input
                    type="text"
                    value={form.plaque}
                    onChange={(event) => handleFieldChange("plaque", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-ivory px-3 py-2.5 text-sm outline-none ring-gold/30 focus:border-gold focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">واحد</label>
                  <input
                    type="text"
                    value={form.unit}
                    onChange={(event) => handleFieldChange("unit", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-ivory px-3 py-2.5 text-sm outline-none ring-gold/30 focus:border-gold focus:ring-2"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-slate-600">کد پستی *</label>
                  <input
                    type="text"
                    value={form.postalCode}
                    onChange={(event) => handleFieldChange("postalCode", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-ivory px-3 py-2.5 text-sm outline-none ring-gold/30 focus:border-gold focus:ring-2"
                  />
                  {errors.postalCode ? (
                    <p className="mt-1 text-xs text-red-500">{errors.postalCode}</p>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-ivory px-3 py-2.5 text-xs text-slate-600">
                برای تحویل حضوری، پس از ثبت سفارش کارشناسان ما جهت زمان مراجعه با شما تماس می‌گیرند.
              </div>
            )}

            <fieldset className="space-y-2">
              <legend className="mb-2 text-xs font-semibold text-slate-600">روش پرداخت</legend>
              {paymentOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 text-sm ${
                    form.paymentMethod === option.id
                      ? "border-gold bg-gold/10"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-navy">{option.title}</p>
                    <p className="text-xs text-slate-500">{option.description}</p>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={form.paymentMethod === option.id}
                    onChange={() => handleFieldChange("paymentMethod", option.id)}
                  />
                </label>
              ))}
              {errors.paymentMethod ? (
                <p className="mt-1 text-xs text-red-500">{errors.paymentMethod}</p>
              ) : null}
            </fieldset>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                توضیحات سفارش (اختیاری)
              </label>
              <textarea
                rows={3}
                value={form.note}
                onChange={(event) => handleFieldChange("note", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-ivory px-3 py-2.5 text-sm outline-none ring-gold/30 focus:border-gold focus:ring-2"
                placeholder="مثال: بازه زمانی تحویل یا توضیحات بسته‌بندی"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy/90"
            >
              ثبت سفارش
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
