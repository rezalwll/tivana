import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/home/ProductCard";
import { blogPosts } from "@/data/blog";
import { categories, featuredCategorySlugs, products } from "@/data/products";

const sectionNotes: Record<string, string> = {
  zananeh: "جواهرات ظریف و مدرن برای لحظات درخشان شما",
  mardaneh: "زنجیر و دستبندهای شاخص برای استایل رسمی و روزمره",
  parsian: "گزیده‌ای از شمش‌های پارسیان برای سرمایه‌گذاری مطمئن",
  kids: "هدایای لطیف برای کودکان با طراحی ایمن و دوست‌داشتنی"
};

const specialCollections = [
  {
    title: "کلکسیون نامزدی",
    desc: "حلقه‌های الماسه، ست گردنبند و گوشواره برای لحظات خواستگاری و نامزدی.",
    image: "/images/collections/engagement.jpg"
  },
  {
    title: "هدایای تولد",
    desc: "پک‌های هدیه با بسته‌بندی ویژه و پیام شخصی‌سازی شده برای تولد عزیزان.",
    image: "/images/collections/birthday.jpg"
  },
  {
    title: "هدایای خاص آقایان",
    desc: "دستبند چرم و طلا، دکمه سرآستین و زنجیرهای مینیمال برای هدیه لوکس.",
    image: "/images/collections/men.jpg"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* سکشن هیرو با تصویر پس‌زمینه ثابت */}
      <section className="relative isolate min-h-[80vh] overflow-hidden bg-[url('/images/22.png')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/20" />
        <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 py-16 lg:flex-row lg:items-center lg:py-24">
          <div className="w-full space-y-6 text-white lg:w-1/2">
            <p className="text-sm font-semibold text-gold">کلکسیون محدود</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              گردنبند رگ مرزی
            </h1>
            <p className="text-lg text-slate-200">
              ظرافتی که نور را می‌رقصاند؛ ترکیب رگه‌های طلایی و خطوط مینیمال برای استایل‌های ویژه شب.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#"
                className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:bg-gold/90"
              >
                مشاهده محصول
              </Link>
              <Link
                href="#categories"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                مشاهده کلکسیون
              </Link>
            </div>
          </div>

          <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur lg:w-1/2">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <Image
              src="/images/hero-secondary.jpg"
              alt="جواهرات لوکس"
              width={720}
              height={480}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* دسته‌بندی‌ها */}
      <section id="categories" className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-gold">دسته‌بندی محبوب</p>
          <h2 className="mt-2 text-3xl font-bold text-navy">کلکسیون‌های طلای تاج</h2>
          <p className="mt-3 text-base text-slate-600">
            برای هر لحظه خاص، داستانی در طلای شما
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="group relative overflow-hidden rounded-2xl bg-slate-900/5 shadow shadow-black/5"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={480}
                height={360}
                className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 md:h-48 lg:h-52"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <p className="text-sm text-slate-200">مشاهده محصولات</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* داستان برند */}
      <section id="brand-story" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2">
        <div className="relative h-full min-h-[360px] overflow-hidden rounded-3xl bg-gradient-to-br from-ivory to-white shadow-lg shadow-black/5">
          <div className="absolute inset-0 bg-[url('/images/brand-story.jpg')] bg-cover bg-center mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy/70 via-navy/10 to-transparent" />
          <div className="absolute left-6 top-6 flex flex-col gap-2">
            <span className="h-1 w-12 rounded-full bg-gold" />
            <span className="h-1 w-10 rounded-full bg-gold/70" />
            <span className="h-1 w-8 rounded-full bg-gold/50" />
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-sm font-semibold text-gold">هنر دست‌ساز</p>
          <h3 className="text-3xl font-bold text-navy">داستان‌های طلای تاج</h3>
          <p className="text-base leading-8 text-slate-600">
            در کارگاه‌های گالری تاج، هر قطعه طلا پیش از آنکه زینت شما شود، داستانی از هنر، عشق و ظرافت را طی می‌کند. استادکاران ما با بهره‌گیری از تکنیک‌های سنتی و طراحی معاصر، فرم‌هایی را خلق می‌کنند که با هر حرکت، نور را به رقص در می‌آورد.
          </p>
          <p className="text-base leading-8 text-slate-600">
            از انتخاب آلیاژ تا پرداخت نهایی، هر مرحله با وسواس و دقت انجام می‌شود تا جواهری ماندگار و اصیل به دست شما برسد. اینجا، هر محصول امضای دست‌ساز بودن و ضمانت اصالت دارد.
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-navy px-4 py-2 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:border-gold hover:text-gold"
          >
            بیشتر بخوانید
            <span className="text-lg">↗</span>
          </Link>
        </div>
      </section>

      {/* پیش‌نمایش محصولات دسته‌های منتخب */}
      <section className="space-y-16">
        {featuredCategorySlugs.map((slug) => {
          const title = categories.find((c) => c.slug === slug)?.name ?? "دسته‌بندی";
          const list = products.filter((product) => product.category === slug);
          return (
            <div key={slug} className="mx-auto max-w-6xl px-4">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gold">منتخب {title}</p>
                  <h3 className="text-2xl font-bold text-navy">{title}</h3>
                  <p className="text-sm text-slate-600">{sectionNotes[slug]}</p>
                </div>
                <Link href="#" className="text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-8 transition hover:text-gold">
                  مشاهده همه
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* سکشن کلکسیون‌های خاص */}
      <section className="bg-gradient-to-l from-white via-ivory to-slate-100 py-14">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-gold">هدایا و کلکسیون‌ها</p>
            <h3 className="mt-2 text-3xl font-bold text-navy">انتخاب‌های ویژه</h3>
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
                  <h4 className="text-xl font-semibold text-navy">{item.title}</h4>
                  <p className="text-sm leading-7 text-slate-600">{item.desc}</p>
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
      <section className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold text-gold">مجله تاج</p>
          <h3 className="mt-2 text-3xl font-bold text-navy">داستان‌های طلای ما</h3>
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
                <h4 className="text-xl font-semibold text-navy">{post.title}</h4>
                <p className="text-sm leading-7 text-slate-600">{post.excerpt}</p>
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
