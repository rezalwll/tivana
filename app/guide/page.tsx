import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "راهنمای خرید و سایز", description: "راهنمای انتخاب طلا، اندازه‌گیری سایز و ثبت درخواست خرید از تیوانا.", alternates: { canonical: "/guide" } };

const sizeRows = [["۴۹", "۱۵٫۶ میلی‌متر", "۴۹ میلی‌متر"], ["۵۲", "۱۶٫۵ میلی‌متر", "۵۲ میلی‌متر"], ["۵۴", "۱۷٫۲ میلی‌متر", "۵۴ میلی‌متر"], ["۵۷", "۱۸٫۱ میلی‌متر", "۵۷ میلی‌متر"], ["۶۰", "۱۹٫۱ میلی‌متر", "۶۰ میلی‌متر"]];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24" dir="rtl">
      <header className="rounded-[2.5rem] bg-navy px-7 py-14 text-white sm:px-12"><p className="text-xs font-semibold text-gold">راهنمای مشتریان</p><h1 className="mt-3 text-3xl font-bold sm:text-4xl">انتخاب مطمئن، بدون پیچیدگی</h1><p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300">از مقایسه وزن و عیار تا پیدا کردن سایز مناسب؛ نکاتی که پیش از ثبت درخواست خرید به کارتان می‌آیند.</p></header>

      <section className="grid gap-6 py-16 md:grid-cols-3">
        {[["عیار", "محصولات زیورآلات این کاتالوگ با عیار ۱۸ معرفی شده‌اند. عیار نهایی روی فاکتور درج می‌شود."], ["وزن", "وزن درج‌شده مبنای کاتالوگ است و وزن دقیق قطعه موجود پیش از پرداخت تأیید می‌شود."], ["قیمت", "قیمت به وزن، نرخ روز طلا، اجرت و هزینه‌های قانونی وابسته است؛ بنابراین پیش از پرداخت نهایی می‌شود."]].map(([title,text]) => <article key={title} className="rounded-[2rem] bg-white p-7"><span className="text-xs font-semibold text-gold">نکته کلیدی</span><h2 className="mt-3 text-xl font-bold text-navy">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-500">{text}</p></article>)}
      </section>

      <section id="size" className="scroll-mt-36 rounded-[2.5rem] bg-white p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div><p className="text-xs font-semibold text-gold">راهنمای سایز انگشتر</p><h2 className="mt-3 text-2xl font-bold text-navy">اندازه‌گیری با یک انگشتر مناسب</h2><ol className="mt-6 space-y-4 text-sm leading-7 text-slate-600"><li><b className="text-navy">۱.</b> انگشتری را انتخاب کنید که روی همان انگشت به‌خوبی می‌نشیند.</li><li><b className="text-navy">۲.</b> قطر داخلی حلقه را از یک لبه داخلی تا لبه روبه‌رو، بدون احتساب ضخامت فلز اندازه بگیرید.</li><li><b className="text-navy">۳.</b> اندازه را با جدول روبه‌رو تطبیق دهید. اگر بین دو سایز بودید، سایز بزرگ‌تر را انتخاب کنید.</li></ol><p className="mt-5 rounded-2xl bg-amber-50 p-4 text-xs leading-6 text-amber-900">اندازه‌گیری را در دمای معمولی و انتهای روز انجام دهید؛ اندازه انگشت ممکن است با سرما و گرما تغییر کند.</p></div>
          <div className="overflow-hidden rounded-2xl border border-slate-200"><table className="w-full text-right text-sm"><thead className="bg-navy text-white"><tr><th className="p-4">سایز</th><th className="p-4">قطر داخلی</th><th className="p-4">محیط انگشت</th></tr></thead><tbody>{sizeRows.map((row) => <tr key={row[0]} className="border-b border-slate-100 last:border-0">{row.map((cell) => <td key={cell} className="p-4 text-slate-600">{cell}</td>)}</tr>)}</tbody></table></div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2"><div className="rounded-[2rem] bg-[#e9dfcc] p-8"><h2 className="text-xl font-bold text-navy">سایز دستبند</h2><p className="mt-3 text-sm leading-7 text-slate-600">متر را بدون فشار دور مچ بگیرید. برای فیت معمولی ۱ تا ۱٫۵ سانتی‌متر و برای فیت آزاد ۱٫۵ تا ۲ سانتی‌متر به اندازه مچ اضافه کنید.</p></div><div className="rounded-[2rem] bg-navy p-8 text-white"><h2 className="text-xl font-bold text-gold">هنوز مطمئن نیستید؟</h2><p className="mt-3 text-sm leading-7 text-slate-300">مدل و اندازه تقریبی را در فرم تماس بفرستید تا پیش از ثبت نهایی راهنمایی شوید.</p><Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-gold">درخواست مشاوره ←</Link></div></section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <article className="rounded-[2rem] bg-white p-8">
          <p className="text-xs font-semibold text-gold">راهنمای گردنبند</p>
          <h2 className="mt-3 text-xl font-bold text-navy">انتخاب طول زنجیر</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">زنجیر ۴۰ تا ۴۲ سانتی‌متری نزدیک استخوان ترقوه می‌نشیند، ۴۵ سانتی‌متر انتخابی همه‌کاره است و طول ۵۰ سانتی‌متر برای لایه‌سازی یا یقه‌های بسته مناسب‌تر است.</p>
        </article>
        <article className="rounded-[2rem] bg-white p-8">
          <p className="text-xs font-semibold text-gold">راهنمای حلقه و دستبند</p>
          <h2 className="mt-3 text-xl font-bold text-navy">بین دو سایز هستید؟</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">برای انگشترهای پهن و دستبندهای فیت آزاد، انتخاب اندازه بزرگ‌تر معمولاً راحت‌تر است. اندازه‌گیری را انتهای روز و در دمای معمولی انجام دهید.</p>
        </article>
        <article className="rounded-[2rem] bg-[#e9dfcc] p-8">
          <p className="text-xs font-semibold text-gold">نکته کاربردی</p>
          <h2 className="mt-3 text-xl font-bold text-navy">لایه‌سازی بدون گره</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">بین طول دو گردنبند دست‌کم ۵ سانتی‌متر فاصله بگذارید و آویزهای حجیم‌تر را در لایه پایین‌تر قرار دهید.</p>
        </article>
      </section>

      <section id="care" className="mt-10 scroll-mt-36 overflow-hidden rounded-[2.5rem] bg-navy text-white">
        <div className="grid lg:grid-cols-[.8fr_1.2fr]">
          <div className="p-8 sm:p-10">
            <p className="text-xs font-semibold text-gold">مراقبت از طلا</p>
            <h2 className="mt-3 text-2xl font-bold">چند عادت ساده برای درخشش ماندگار</h2>
            <p className="mt-4 text-sm leading-8 text-slate-300">نگهداری درست، تماس کمتر با مواد شیمیایی و پاک‌کردن ملایم بعد از استفاده، عمر ظاهر زیورآلات را بیشتر می‌کند.</p>
          </div>
          <div className="grid border-t border-white/10 sm:grid-cols-2 lg:border-r lg:border-t-0">
            {[["۱", "پیش از آب و ورزش", "زیورآلات را پیش از حمام، شنا، ورزش و خواب خارج کنید."], ["۲", "بعد از عطر و کرم", "اجازه دهید عطر، کرم و اسپری خشک شوند؛ سپس زیورآلات را استفاده کنید."], ["۳", "پاک‌کردن ملایم", "بعد از استفاده با پارچه نرم و بدون پرز، بدون فشار زیاد پاک کنید."], ["۴", "نگهداری جداگانه", "هر قطعه را در کیسه پارچه‌ای جدا و در محیط خشک و خنک نگه دارید."]].map(([number, title, text]) => (
              <article key={number} className="border-b border-white/10 p-7 odd:sm:border-l">
                <span className="text-sm font-bold text-gold">{number}</span>
                <h3 className="mt-3 font-bold">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
