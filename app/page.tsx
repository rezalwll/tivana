"use client";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/home/ProductCard";
import { blogPosts } from "@/data/blog";
import { categories, products } from "@/data/products";
import { useRef } from "react";

const sectionNotes: Record<string, string> = {
  zananeh: "جواهرات ظریف و مدرن برای لحظات درخشان شما",
  mardaneh: "زنجیر و دستبندهای شاخص برای استایل رسمی و روزمره",
  parsian: "گزیده‌ای از شمش‌های پارسیان برای سرمایه‌گذاری مطمئن",
  kids: "هدایای لطیف برای کودکان با طراحی ایمن و دوست‌داشتنی",
};

const specialCollections = [
  {
    title: "کلکسیون نامزدی",
    desc: "حلقه‌های الماسه، ست گردنبند و گوشواره برای لحظات خواستگاری و نامزدی.",
    image: "/images/22.png",
  },
  {
    title: "هدایای تولد",
    desc: "پک‌های هدیه با بسته‌بندی ویژه و پیام شخصی‌سازی شده برای تولد عزیزان.",
    image: "/images/22.png",
  },
  {
    title: "هدایای خاص آقایان",
    desc: "دستبند چرم و طلا، دکمه سرآستین و زنجیرهای مینیمال برای هدیه لوکس.",
    image: "/images/22.png",
  },
];

// تایپ دسته‌بندی بر اساس دیتایی که از products می‌آد
type Category = (typeof categories)[number];

function CategoryCard({ cat }: { cat: Category }) {
  return (
    <Link
      href={`/category/${cat.slug}`}
      className="
        group block w-full overflow-hidden rounded-3xl bg-white p-4
        text-right shadow-sm transition-transform duration-300
      "
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl"> 
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          className="object-cover transition-transform duration-500"
        />
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-800 text-center">
        {cat.name}
      </p>
    </Link>
  );
}

export default function HomePage() {
  const mainCategories = categories.slice(0, 4);
  const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollCategory = (slug: string, direction: "prev" | "next") => {
    const container = sliderRefs.current[slug];
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const offset = direction === "next" ? scrollAmount : -scrollAmount;
    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="space-y-24 pb-20">
      {/* سکشن هیرو با تصویر پس‌زمینه ثابت */}
      <section className="relative isolate -mt-28 min-h-[100vh] overflow-hidden bg-[url('/images/main-section-bg.png')] bg-cover bg-center bg-fixed pt-28 lg:-mt-32 lg:pt-32">
        <div className="relative mx-auto pl-[100px] sm:pl-[300px] lg:pl-[500px] xl:pl-[700px]">
          <div className="flex items-center flex-col">
            <Image
              src="/images/tivanalogo.png"
              alt="Tivana logo"
              width={200}
              height={200}
            />
            <div>
              <p className="pb-5 text-xl font-semibold text-gold sm:text-3xl lg:text-4xl">
                Tivana gold gallery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* دسته‌بندی‌ها – طرح جدید با فضاهای سفید و چیدمان پله‌ای */}
      <section id="categories" className="w-full bg-[#f7f7f7] py-16" dir="rtl">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-gold">
              دسته‌بندی‌های اصلی
            </p>
            <h2 className="mt-2 text-3xl font-bold text-navy">
              کلکسیون‌های طلای تیوانا
            </h2>
            <p className="mt-3 text-base text-slate-600">
              برای شروع، چهار دسته‌ی اصلی را ببینید
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* ستون چپ */}
            <div className="space-y-8">
              {mainCategories.slice(0, 2).map((cat) => (
                <CategoryCard key={cat.slug} cat={cat} />
              ))}
            </div>

            {/* ستون راست - کمی پایین‌تر برای حس پله‌ای */}
            <div className="space-y-8 md:mt-12">
              {mainCategories.slice(2, 4).map((cat) => (
                <CategoryCard key={cat.slug} cat={cat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* داستان برند */}
      <section
        id="brand-story"
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2"
      >
        <div className="space-y-5">
          <p className="text-sm font-semibold text-gold">هنر دست‌ساز</p>
          <h3 className="text-3xl font-bold text-navy">
            داستان‌ طلای تیوانا
          </h3>
          <p className="text-base leading-9 text-slate-600">
            در کارگاه‌ گالری تیوانا، هر قطعه طلا پیش از آنکه زینت شما شود،
            داستانی از هنر، عشق و ظرافت را طی می‌کند. استادکاران ما با بهره‌گیری
            از تکنیک‌های سنتی و طراحی معاصر، فرم‌هایی را خلق می‌کنند که با هر
            حرکت، نور را به رقص در می‌آورد.
          </p>
          <p className="text-base leading-9 text-slate-600">
            از طراحی  تا پرداخت نهایی، هر مرحله با وسواس و دقت انجام
            می‌شود تا جواهری ماندگار و اصیل به دست شما برسد. اینجا، هر محصول
            امضای دست‌ساز بودن و ضمانت اصالت دارد.
          </p>
        </div>
        <div className="relative h-full min-h-[80vh] overflow-hidden rounded-3xl bg-gradient-to-br from-ivory to-white shadow-lg shadow-black/5">
          <div className="absolute inset-0 bg-[url('/images/storyoftivana.png')] bg-cover bg-center mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy/70 via-navy/10 to-transparent" />
          <div className="absolute left-6 top-6 flex flex-col gap-2">
            <span className="h-1 w-12 rounded-full bg-gold" />
            <span className="h-1 w-10 rounded-full bg-gold/70" />
            <span className="h-1 w-8 rounded-full bg-gold/50" />
          </div>
        </div>
      </section>

      {/* پیش‌نمایش محصولات دسته‌های منتخب */}
      <section className="space-y-16">
        {categories.map((cat) => {
          const slug = cat.slug;
          const title = cat.name;
          const list = products.filter((product) => product.category === slug);
          return (
            <div key={slug} className="mx-auto max-w-6xl px-4" dir="rtl">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gold">
                    منتخب {title}
                  </p>
                  <h3 className="text-2xl font-bold text-navy">{title}</h3>
                  <p className="text-sm text-slate-600">{sectionNotes[slug]}</p>
                </div>
                <Link
                  href={`/category/${slug}`}
                  className="text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-8 transition hover:text-gold"
                >
                  مشاهده همه
                </Link>
              </div>
              <div className="relative">
                <div
                  ref={(el) => (sliderRefs.current[slug] = el)}
                  className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3"
                >
                  {list.map((product) => (
                    <div
                      key={product.id}
                      className="min-w-[230px] snap-start sm:min-w-[260px] lg:min-w-[280px]"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between md:flex">
                  <button
                    type="button"
                    onClick={() => scrollCategory(slug, "prev")}
                    className="pointer-events-auto mx-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-navy shadow-sm transition hover:border-gold hover:text-gold"
                    aria-label="Previous products"
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCategory(slug, "next")}
                    className="pointer-events-auto mx-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-navy shadow-sm transition hover:border-gold hover:text-gold"
                    aria-label="Next products"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* سکشن کلکسیون‌های خاص */}
      <section
        id="collections"
        className="bg-gradient-to-l from-white via-ivory to-slate-100 py-14"
      >
        <div className="mx-auto max-w-6xl space-y-10 px-4" dir="rtl">
          <div className="text-center">
            <p className="text-sm font-semibold text-gold">
              هدایا و کلکسیون‌ها
            </p>
            <h3 className="mt-2 text-3xl font-bold text-navy">
              انتخاب‌های ویژه
            </h3>
            <p className="mt-3 text-base text-slate-600">
              سه انتخاب برجسته برای هدیه دادن یا ساختن لحظاتی به‌یادماندنی
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {specialCollections.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl bg-white shadow shadow-black/5 transition hover:-translate-y-1 hover:shadow-luxe"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={520}
                  height={340}
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="space-y-3 p-6">
                  <h4 className="text-xl font-semibold text-navy">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-7 text-slate-600">
                    {item.desc}
                  </p>
                  <button className="inline-flex items-center gap-2 rounded-full border border-navy px-4 py-2 text-sm font-semibold text-navy transition hover:border-gold hover:text-gold">
                    مشاهده
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* سکشن وبلاگ */}
      <section className="mx-auto max-w-6xl px-4" dir="rtl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold text-gold">مجله تیوانا</p>
          <h3 className="mt-2 text-3xl font-bold text-navy">
            داستان‌های طلای ما
          </h3>
          <p className="mt-3 text-base text-slate-600">
            الهام و دانش برای انتخاب هوشمندانه طلا و جواهر
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-3xl bg-white shadow shadow-black/5 transition hover:-translate-y-1 hover:shadow-luxe"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 90vw"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-6">
                <h4 className="text-xl font-semibold text-navy">
                  {post.title}
                </h4>
                <p className="text-sm leading-7 text-slate-600">
                  {post.excerpt}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-8 transition hover:text-gold"
                >
                  مطالعه مطلب
                  <span className="text-lg">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
