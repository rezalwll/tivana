import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/home/ProductCard";
import { categories, featuredProducts } from "@/data/products";

const assurances = [
  { title: "طلای ۱۸ عیار", text: "مشخصات عیار و وزن هر قطعه پیش از خرید شفاف اعلام می‌شود." },
  { title: "فاکتور معتبر", text: "اطلاعات قطعه و جزئیات قیمت در فاکتور خرید درج خواهد شد." },
  { title: "ارسال امن", text: "نحوه و زمان ارسال پیش از تأیید نهایی سفارش با شما هماهنگ می‌شود." },
  { title: "مشاوره انتخاب", text: "برای انتخاب سایز، هدیه یا مقایسه مدل‌ها همراهتان هستیم." },
];

const steps = [
  ["۱", "انتخاب مدل", "محصولات را بر اساس دسته، وزن و بودجه بررسی کنید."],
  ["۲", "ثبت درخواست", "محصول را به سبد اضافه کنید و اطلاعات تماس را بفرستید."],
  ["۳", "تأیید نهایی", "موجودی، وزن و قیمت روز پیش از پرداخت با شما قطعی می‌شود."],
];

export default function HomePage() {
  return (
    <div className="pb-24">
      <section className="relative -mt-28 min-h-[92vh] overflow-hidden bg-navy pt-28 lg:-mt-32 lg:pt-32">
        <Image
          src="/images/main-section-bg.webp"
          alt="مدل با زیورآلات طلای تیوانا"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[38%_center] opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-navy/10 via-navy/20 to-navy/90" />
        <div className="relative mx-auto flex min-h-[calc(92vh-7rem)] max-w-7xl items-center px-5 py-20 sm:px-8">
          <div className="max-w-xl text-white">
            <span className="inline-flex rounded-full border border-gold/40 bg-navy/30 px-4 py-2 text-xs font-semibold text-gold backdrop-blur">
              جواهراتی برای هر روز، ارزشمند برای همیشه
            </span>
            <h1 className="mt-7 text-4xl font-bold leading-[1.5] sm:text-5xl lg:text-6xl">
              درخششِ ساده،
              <span className="block text-gold">به سبک تیوانا</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-8 text-slate-200 sm:text-base">
              کلکسیونی از زیورآلات طلای ۱۸ عیار با طراحی ظریف و امروزی؛ برای هدیه، استفاده روزمره و لحظه‌هایی که می‌خواهید ماندگار شوند.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/shop" className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy transition hover:bg-[#e4c766]">
                مشاهده فروشگاه
              </Link>
              <Link href="/#collections" className="rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
                دیدن کلکسیون‌ها
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4">
        <div className="grid overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white shadow-luxe sm:grid-cols-2 lg:grid-cols-4">
          {assurances.map((item, index) => (
            <div key={item.title} className={`p-6 ${index ? "border-t border-slate-100 sm:border-r sm:border-t-0" : ""}`}>
              <div className="mb-4 h-1 w-9 rounded-full bg-gold" />
              <h2 className="text-sm font-bold text-navy">{item.title}</h2>
              <p className="mt-2 text-xs leading-6 text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="collections" className="mx-auto max-w-7xl px-4 pt-28">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold">TIVANA COLLECTIONS</p>
            <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">کلکسیون‌ها</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">برای هر سلیقه و هر مناسبت، یک انتخاب درخشان.</p>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-8">همه محصولات</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={`group relative min-h-[24rem] overflow-hidden rounded-[2rem] bg-slate-200 ${index < 2 ? "lg:col-span-6" : "lg:col-span-4"}`}
            >
              <Image src={category.image} alt={category.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <p className="text-xs text-gold">کلکسیون تیوانا</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                    <p className="mt-2 text-xs leading-6 text-slate-200">{category.shortDescription}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-xl transition group-hover:bg-gold group-hover:text-navy">←</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-28">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold">SELECTED FOR YOU</p>
          <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">منتخب تیوانا</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">محبوب‌ترین مدل‌های این فصل، با مشخصات کامل و امکان ثبت درخواست خرید.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="mx-auto mt-28 grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-navy lg:grid-cols-2">
        <div className="relative min-h-[32rem]">
          <Image src="/images/storyoftivana.webp" alt="داستان و نگاه طراحی تیوانا" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
        </div>
        <div className="flex items-center px-7 py-14 text-white sm:px-14 lg:px-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold">OUR STORY</p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.5]">طلا، وقتی با سادگی معنا پیدا می‌کند</h2>
            <p className="mt-6 text-sm leading-8 text-slate-300">
              تیوانا با نگاه به زیبایی ماندگار شکل گرفته است؛ قطعاتی که فقط برای یک مراسم نیستند و می‌توانند بخشی از زندگی روزمره شما شوند. فرم‌های ساده، تناسب دقیق و انتخاب آگاهانه، زبان طراحی این مجموعه‌اند.
            </p>
            <Link href="/about" className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-gold">بیشتر درباره تیوانا <span>←</span></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-28">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold">SIMPLE &amp; CLEAR</p>
          <h2 className="mt-3 text-3xl font-bold text-navy">مسیر خرید از تیوانا</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(([number, title, text]) => (
            <div key={number} className="rounded-[2rem] border border-slate-200/80 bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-sm font-bold text-gold">{number}</span>
              <h3 className="mt-6 text-lg font-bold text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/guide" className="inline-flex rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white">راهنمای کامل خرید</Link>
        </div>
      </section>
    </div>
  );
}
