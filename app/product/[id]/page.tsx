import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "@/components/product/ProductActions";
import ProductCard from "@/components/home/ProductCard";
import JsonLd from "@/components/seo/JsonLd";
import { getCategoryBySlug, getProductById, products } from "@/data/products";
import { absoluteUrl, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  return product
    ? {
        title: product.name,
        description: product.description,
        alternates: { canonical: `/product/${product.id}` },
        openGraph: {
          title: product.name,
          description: product.description,
          type: "website",
          images: [{ url: product.image, alt: product.name }],
        },
      }
    : { title: "محصول" };
}

const formatPrice = (value: number) => new Intl.NumberFormat("fa-IR").format(value);
const formatWeight = (value: number) => new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 2 }).format(value);

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  const category = getCategoryBySlug(product.category);
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const productUrl = absoluteUrl(`/product/${product.id}`);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    sku: product.code,
    material: `طلای ${product.karat} عیار`,
    color: product.color,
    weight: {
      "@type": "QuantitativeValue",
      value: product.weight,
      unitCode: "GRM",
    },
    brand: { "@type": "Brand", name: siteConfig.shortName },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "IRR",
      price: product.price * 10,
      itemCondition: "https://schema.org/NewCondition",
      availability: product.status === "آماده ارسال"
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "فروشگاه", item: absoluteUrl("/shop") },
      ...(category ? [{ "@type": "ListItem", position: 3, name: category.name, item: absoluteUrl(`/category/${category.slug}`) }] : []),
      { "@type": "ListItem", position: category ? 4 : 3, name: product.name, item: productUrl },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24" dir="rtl">
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-gold">خانه</Link><span>/</span>
        <Link href="/shop" className="hover:text-gold">فروشگاه</Link><span>/</span>
        {category ? <><Link href={`/category/${category.slug}`} className="hover:text-gold">{category.name}</Link><span>/</span></> : null}
        <span className="text-slate-800">{product.name}</span>
      </nav>

      <section className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-[#ece7dd]">
          <Image src={product.image} alt={product.name} fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
          <span className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-navy backdrop-blur">{product.status}</span>
        </div>

        <div className="flex items-center">
          <div className="w-full">
            <p className="text-xs font-semibold tracking-[.2em] text-gold">TIVANA · {product.code}</p>
            <h1 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">{product.name}</h1>
            <p className="mt-5 text-sm leading-8 text-slate-600">{product.description}</p>
            <div className="mt-7 flex items-end justify-between gap-4 border-y border-slate-200 py-6">
              <div>
                <p className="text-xs text-slate-500">قیمت فعلی کاتالوگ</p>
                <p className="mt-2 text-2xl font-bold text-navy">{formatPrice(product.price)} <span className="text-sm font-normal text-slate-500">تومان</span></p>
              </div>
              <span className="rounded-full bg-gold/10 px-4 py-2 text-xs font-semibold text-gold">طلای {new Intl.NumberFormat("fa-IR").format(product.karat)} عیار</span>
            </div>

            <dl className="grid grid-cols-2 gap-3 py-6 text-sm sm:grid-cols-4">
              {[["وزن", `${formatWeight(product.weight)} گرم`], ["رنگ", product.color], ["کد", product.code], ["وضعیت", product.status]].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                  <dt className="text-xs text-slate-400">{label}</dt><dd className="mt-2 font-semibold text-navy">{value}</dd>
                </div>
              ))}
            </dl>

            <ProductActions productId={product.id} />
            <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900">
              قیمت نهایی طلا به نرخ لحظه‌ای، وزن دقیق قطعه و موجودی وابسته است و پیش از پرداخت با شما تأیید می‌شود.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-7 sm:p-9">
          <h2 className="text-xl font-bold text-navy">ویژگی‌های محصول</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            {product.features.map((feature) => <li key={feature} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-gold" />{feature}</li>)}
          </ul>
        </div>
        <div className="rounded-[2rem] bg-navy p-7 text-white sm:p-9">
          <h2 className="text-xl font-bold text-gold">پیش از ثبت درخواست</h2>
          <p className="mt-4 text-sm leading-8 text-slate-300">برای انگشتر و دستبند، سایز مناسب را بررسی کنید. سفارش‌های سفارشی پس از تأیید طرح، رنگ و زمان ساخت نهایی می‌شوند.</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/guide#size" className="text-gold">راهنمای سایز ←</Link>
            <Link href="/shipping" className="text-gold">شرایط ارسال ←</Link>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="mt-24">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div><p className="text-xs font-semibold text-gold">پیشنهادهای مشابه</p><h2 className="mt-2 text-2xl font-bold text-navy">شاید بپسندید</h2></div>
            {category ? <Link href={`/category/${category.slug}`} className="text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-8">همه {category.name}‌ها</Link> : null}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
        </section>
      ) : null}
    </div>
  );
}
