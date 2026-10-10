import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "درباره ما", description: "نگاه و داستان گالری طلای تیوانا.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24" dir="rtl">
      <section className="grid overflow-hidden rounded-[2.5rem] bg-navy lg:grid-cols-2">
        <div className="flex items-center px-7 py-16 text-white sm:px-14">
          <div><p className="text-xs font-semibold tracking-[.2em] text-gold">ABOUT TIVANA</p><h1 className="mt-4 text-4xl font-bold leading-[1.5]">زیباییِ ماندگار، برای زندگی امروز</h1><p className="mt-6 text-sm leading-8 text-slate-300">تیوانا با یک نگاه روشن به طلا شکل گرفته است: طراحی باید آن‌قدر خالص باشد که سال‌ها قابل استفاده بماند و آن‌قدر دقیق باشد که هر بار پوشیدنش لذت‌بخش باشد.</p></div>
        </div>
        <div className="relative min-h-[30rem]"><Image src="/images/storyoftivana.webp" alt="هویت بصری گالری تیوانا" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 py-24 md:grid-cols-[.8fr_1.2fr]">
        <div><p className="text-xs font-semibold text-gold">نگاه ما</p><h2 className="mt-3 text-3xl font-bold leading-[1.5] text-navy">کمتر، اما بهتر و ماندگارتر</h2></div>
        <div className="space-y-5 text-sm leading-8 text-slate-600"><p>در انتخاب محصولات تیوانا، تناسب فرم، راحتی استفاده و کیفیت پرداخت مهم‌تر از ترندهای کوتاه‌مدت است. به همین دلیل بخش زیادی از مجموعه را قطعات سبک و قابل ترکیب تشکیل می‌دهند.</p><p>اطلاعات هر محصول—از وزن و عیار تا کد و وضعیت آماده‌سازی—پیش از خرید در اختیار شما قرار می‌گیرد. از آنجا که نرخ طلا و وزن نهایی ممکن است تغییر کند، قیمت قطعی پیش از پرداخت تأیید می‌شود.</p></div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[["شفافیت", "مشخصات روشن، تأیید قیمت روز و پاسخ صریح به پرسش‌های خرید."], ["سادگی", "فرم‌های قابل‌استفاده که با استایل‌های مختلف هماهنگ می‌شوند."], ["همراهی", "راهنمایی برای انتخاب سایز، بودجه و هدیه پیش از تصمیم نهایی."]].map(([title, text]) => <div key={title} className="rounded-[2rem] bg-white p-8"><div className="h-1 w-10 rounded-full bg-gold"/><h3 className="mt-6 text-xl font-bold text-navy">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{text}</p></div>)}
      </section>

      <section className="mt-20 rounded-[2.5rem] bg-[#e9dfcc] px-7 py-12 text-center sm:px-12"><h2 className="text-2xl font-bold text-navy">قطعه بعدی‌تان را پیدا کنید</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">کلکسیون تیوانا را ببینید یا برای انتخاب بهتر، راهنمای خرید را بخوانید.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/shop" className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white">مشاهده فروشگاه</Link><Link href="/guide" className="rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy">راهنمای خرید</Link></div></section>
    </div>
  );
}
