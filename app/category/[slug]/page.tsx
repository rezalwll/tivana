import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/home/ProductCard";
import { categories, products } from "@/data/products";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((cat) => cat.slug === slug);
  const title = category ? category.name : "دسته‌بندی";

  return {
    title,
    description: category
      ? `محصولات ${category.name} در گالری تیوانا`
      : "محصولات گالری طلا تیوانا",
    alternates: category ? { canonical: `/category/${category.slug}` } : undefined,
    openGraph: category ? {
      title: category.name,
      description: category.description,
      images: [{ url: category.image, alt: category.name }],
    } : undefined,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((cat) => cat.slug === slug);
  if (!category) {
    notFound();
  }

  const items = products.filter((product) => product.category === category.slug);
  const otherCategories = categories.filter((cat) => cat.slug !== category.slug);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16" dir="rtl">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-l from-white via-ivory to-white shadow shadow-black/5">
        <div className="grid gap-8 p-8 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gold">دسته‌بندی</p>
            <h1 className="text-3xl font-bold text-navy">{category.name}</h1>
            <p className="max-w-xl text-sm leading-8 text-slate-600">{category.description}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-navy shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-gold"
                >
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={category.image}
              alt={category.name}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 90vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gold">
            محصولات {category.name}
          </p>
          <h2 className="text-2xl font-bold text-navy">{new Intl.NumberFormat("fa-IR").format(items.length)} انتخاب از این کلکسیون</h2>
        </div>
        <Link
          href="/#categories"
          className="text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-8 transition hover:text-gold"
        >
          بازگشت به دسته‌بندی‌ها
        </Link>
      </div>

      {items.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-600 shadow shadow-black/5">
          محصولی برای این دسته‌بندی در حال حاضر موجود نیست.
        </div>
      )}
    </div>
  );
}
