"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import ProductCard from "@/components/home/ProductCard";
import { categories, products } from "@/data/products";

const sectionNotes: Record<string, string> = {
  earring: "گوشواره‌های منتخب با طراحی مینیمال و مناسب استفاده روزمره.",
  necklace: "گردنبندهای ظریف و کلاسیک برای استایل رسمی و روزانه.",
  bracelet: "دستبندهای خاص با پرداخت دقیق و طراحی دست‌ساز.",
  ring: "انگشترهای نگین‌دار و ساده برای هدیه و استفاده شخصی.",
  parsian: "شمش‌های پارسیان برای هدیه و سرمایه‌گذاری مطمئن.",
};

type Category = (typeof categories)[number];

function CategoryCard({ cat }: { cat: Category }) {
  return (
    <Link
      href={`/category/${cat.slug}`}
      className="group block w-full overflow-hidden hover:bg-gold/30 rounded-3xl bg-white p-4 text-right shadow-sm transition duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          className="object-cover transition-transform duration-500"
        />
      </div>

      <p className="mt-4 text-center text-sm font-semibold text-slate-800">{cat.name}</p>
    </Link>
  );
}

export default function HomePage() {
  const mainCategories = categories.slice(0, 4);
  const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const scrollCategory = (slug: string, direction: "prev" | "next") => {
    const container = sliderRefs.current[slug];
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const offset = direction === "next" ? scrollAmount : -scrollAmount;
    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const container = event.currentTarget;
    dragState.current.isDragging = true;
    dragState.current.startX = event.clientX;
    dragState.current.scrollLeft = container.scrollLeft;
    dragState.current.hasMoved = false;
    container.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) return;
    const container = event.currentTarget;
    const delta = event.clientX - dragState.current.startX;
    if (Math.abs(delta) > 4) {
      dragState.current.hasMoved = true;
    }
    container.scrollLeft = dragState.current.scrollLeft - delta;
    event.preventDefault();
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState.current.hasMoved) return;
    event.preventDefault();
    event.stopPropagation();
    dragState.current.hasMoved = false;
  };

  return (
    <div className="space-y-24 pb-20">
      <section className="relative isolate -mt-28 min-h-[100vh] overflow-hidden bg-[url('/images/main-section-bg.png')] bg-cover bg-center bg-fixed pt-28 lg:-mt-32 lg:pt-32">
        <div className="relative mx-auto pl-[100px] sm:pl-[300px] lg:pl-[500px] xl:pl-[700px]">
          <div className="flex flex-col items-center">
            <Image src="/images/tivanalogo.png" alt="Tivana logo" width={200} height={200} />
            <p className="pb-5 text-xl font-semibold text-gold sm:text-3xl lg:text-4xl">
              Tivana gold gallery
            </p>
          </div>
        </div>
      </section>

      <section id="categories" className="w-full bg-[#f7f7f7] py-16" dir="rtl">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="mt-2 text-3xl font-bold text-navy">کلکسیون‌های طلای تیوانا</h2>

          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              {mainCategories.slice(0, 2).map((cat) => (
                <CategoryCard key={cat.slug} cat={cat} />
              ))}
            </div>

            <div className="space-y-8 md:mt-12">
              {mainCategories.slice(2, 4).map((cat) => (
                <CategoryCard key={cat.slug} cat={cat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="brand-story"
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2"
      >
        <div className="space-y-5">
          <p className="text-sm font-semibold text-gold">هنر دست‌ساز</p>
          <h3 className="text-3xl font-bold text-navy">داستان طلای تیوانا</h3>
          <p className="text-base leading-9 text-slate-600">
            در کارگاه تیوانا، هر قطعه طلا قبل از رسیدن به ویترین، مسیر دقیقی از طراحی تا
            پرداخت نهایی را طی می‌کند. ترکیب تکنیک‌های سنتی و سلیقه مدرن باعث می‌شود هر
            محصول، ظاهری ماندگار و اصیل داشته باشد.
          </p>
          <p className="text-base leading-9 text-slate-600">
            هدف ما فقط فروش یک محصول نیست؛ می‌خواهیم تجربه خریدی مطمئن و شفاف بسازیم تا
            انتخاب طلا برای شما ساده، امن و لذت‌بخش باشد.
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

      <section className="space-y-16">
        {categories.map((cat) => {
          const slug = cat.slug;
          const title = cat.name;
          const list = products.filter((product) => product.category === slug);

          return (
            <div key={slug} className="mx-auto max-w-6xl px-4" dir="rtl">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gold">منتخب {title}</p>
                  <h3 className="text-2xl font-bold text-navy">{title}</h3>
                  <p className="text-sm text-slate-600">
                    {sectionNotes[slug] ?? "منتخبی از محصولات این دسته‌بندی"}
                  </p>
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
                  className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 cursor-grab select-none active:cursor-grabbing"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  onDragStartCapture={handleDragStart}
                  onClickCapture={handleClickCapture}
                >
                  {list.map((product) => (
                    <div
                      key={product.id}
                      className="snap-start shrink-0 basis-full sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-3rem)/4)]"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between md:flex">
                  <button
                    type="button"
                    onClick={() => scrollCategory(slug, "next")}
                    className="pointer-events-auto mx-1 flex h-10 w-10 items-center justify-center rounded-full border text-lg transition border-gold text-gold hover:bg-gold hover:text-black"
                    aria-label="Previous products"
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCategory(slug, "prev")}
                    className="pointer-events-auto mx-1 flex h-10 w-10 items-center justify-center rounded-full border text-lg transition border-gold text-gold hover:bg-gold hover:text-black"
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
    </div>
  );
}
