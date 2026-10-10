import Image from "next/image";
import Link from "next/link";
import { businessContact } from "@/config/business";
import { categories } from "@/data/products";

export default function Footer() {
  const currentYear = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric" }).format(new Date());

  return (
    <footer className="bg-navy text-white" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 pt-16">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 md:flex-row md:items-center">
          <div><p className="text-xs font-semibold tracking-[.2em] text-gold">TIVANA GOLD GALLERY</p><h2 className="mt-3 text-2xl font-bold">درخشش ساده، انتخاب ماندگار</h2></div>
          <Link href="/shop" className="inline-flex w-fit rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy">مشاهده فروشگاه</Link>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3"><Image src="/images/tivanalogo.webp" alt="نشان تیوانا" width={589} height={758} className="h-12 w-auto object-contain"/><span className="font-semibold text-gold">گالری طلای تیوانا</span></Link>
            <p className="text-sm leading-7 text-slate-300">زیورآلات طلای ۱۸ عیار با طراحی مینیمال برای استفاده روزمره، هدیه و لحظه‌های ماندگار.</p>
            <p className="text-xs leading-6 text-slate-400">قیمت‌ها پس از تأیید نرخ روز، وزن دقیق و موجودی نهایی می‌شوند.</p>
          </div>
          <div><h3 className="mb-5 text-sm font-bold text-gold">فروشگاه</h3><ul className="space-y-3 text-sm text-slate-300"><li><Link href="/shop" className="hover:text-gold">همه محصولات</Link></li>{categories.map((category) => <li key={category.slug}><Link href={`/category/${category.slug}`} className="hover:text-gold">{category.name}</Link></li>)}</ul></div>
          <div><h3 className="mb-5 text-sm font-bold text-gold">راهنمای مشتریان</h3><ul className="space-y-3 text-sm text-slate-300"><li><Link href="/guide" className="hover:text-gold">راهنمای خرید و سایز</Link></li><li><Link href="/shipping" className="hover:text-gold">ثبت درخواست و ارسال</Link></li><li><Link href="/faq" className="hover:text-gold">پرسش‌های متداول</Link></li><li><Link href="/favorites" className="hover:text-gold">علاقه‌مندی‌ها</Link></li></ul></div>
          <div><h3 className="mb-5 text-sm font-bold text-gold">تیوانا</h3><ul className="space-y-3 text-sm text-slate-300"><li><Link href="/about" className="hover:text-gold">درباره ما</Link></li><li><Link href="/contact" className="hover:text-gold">تماس و مشاوره</Link></li><li><Link href="/cart" className="hover:text-gold">سبد درخواست خرید</Link></li>{businessContact.phone ? <li><a dir="ltr" href={`tel:${businessContact.phone}`} className="inline-block hover:text-gold">{businessContact.phone}</a></li> : null}{businessContact.instagramUrl ? <li><a dir="ltr" href={businessContact.instagramUrl} target="_blank" rel="noreferrer" className="inline-block hover:text-gold">@{businessContact.instagramHandle}</a></li> : null}{businessContact.email ? <li><a dir="ltr" href={`mailto:${businessContact.email}`} className="inline-block break-all hover:text-gold">{businessContact.email}</a></li> : null}{businessContact.city ? <li>{businessContact.city}</li> : null}</ul><div className="mt-6 rounded-2xl border border-white/10 p-4 text-xs leading-6 text-slate-400">برای امنیت خرید، مبلغ و روش پرداخت فقط پس از تأیید مستقیم درخواست اعلام می‌شود.</div></div>
        </div>
      </div>
      <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"><p>© {currentYear} گالری طلای تیوانا</p><p>تمامی حقوق محفوظ است.</p></div></div>
    </footer>
  );
}
