import type { Metadata } from "next";
import ShopGrid from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "فروشگاه طلا",
  description: "مشاهده و مقایسه زیورآلات طلای ۱۸ عیار و پلاک‌های پارسیان گالری تیوانا.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24" dir="rtl">
      <header className="mb-10 overflow-hidden rounded-[2.5rem] bg-navy px-6 py-12 text-white sm:px-12 sm:py-16">
        <p className="text-xs font-semibold tracking-[.2em] text-gold">TIVANA SHOP</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-5xl">فروشگاه تیوانا</h1>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300">۲۰ مدل با تصویر اختصاصی و مشخصات کامل؛ بر اساس دسته‌بندی، کاربرد، موجودی، وزن و قیمت مقایسه کنید. قیمت نهایی با نرخ روز و وزن دقیق تأیید می‌شود.</p>
      </header>
      <ShopGrid />
    </div>
  );
}
