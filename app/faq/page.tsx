import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: "پرسش‌های متداول", description: "پاسخ پرسش‌های رایج درباره قیمت، عیار، سفارش و ارسال محصولات تیوانا.", alternates: { canonical: "/faq" } };

const faqs = [
  { question: "قیمت نمایش‌داده‌شده قطعی است؟", answer: "خیر. قیمت طلا با نرخ روز تغییر می‌کند و وزن قطعات نیز ممکن است اختلاف جزئی داشته باشد. موجودی، وزن دقیق و مبلغ نهایی پیش از پرداخت تأیید می‌شود." },
  { question: "محصولات با چه عیاری عرضه می‌شوند؟", answer: "زیورآلات این کاتالوگ با عنوان طلای ۱۸ عیار معرفی شده‌اند. عیار و مشخصات قطعه نهایی در زمان تأیید سفارش و روی فاکتور اعلام می‌شود." },
  { question: "برای خرید آنلاین باید چه کار کنم؟", answer: "محصول را به سبد درخواست اضافه کنید، مشخصات تماس را ثبت کنید و منتظر تأیید موجودی و قیمت بمانید. ثبت درخواست به‌معنای پرداخت یا خرید قطعی نیست." },
  { question: "مدل سفارشی چقدر زمان می‌برد؟", answer: "زمان ساخت به مدل، سایز و رنگ انتخابی وابسته است و بعد از بررسی درخواست به شما اعلام می‌شود. ساخت تنها پس از تأیید جزئیات شروع خواهد شد." },
  { question: "چطور سایز انگشتر را انتخاب کنم؟", answer: "در صفحه راهنمای خرید، جدول قطر و محیط انگشت قرار دارد. اگر بین دو سایز هستید یا خریدتان هدیه است، پیش از ثبت سفارش مشاوره بگیرید." },
  { question: "روش ارسال چگونه است؟", answer: "روش، هزینه و بازه تحویل متناسب با شهر مقصد و ارزش مرسوله پیش از نهایی‌شدن سفارش اعلام می‌شود. جزئیات کامل در صفحه شرایط ارسال آمده است." },
];

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return <div className="mx-auto max-w-4xl px-4 pb-24" dir="rtl"><JsonLd data={faqSchema} /><header className="mb-10 text-center"><p className="text-xs font-semibold text-gold">پاسخ‌های کوتاه و روشن</p><h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">پرسش‌های متداول</h1><p className="mt-4 text-sm text-slate-500">اگر پاسخ‌تان را پیدا نکردید، از صفحه تماس برای ما پیام بفرستید.</p></header><div className="space-y-4">{faqs.map(({ question, answer }, index) => <details key={question} open={index === 0} className="group rounded-[1.5rem] border border-slate-200 bg-white p-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-navy"><span>{question}</span><span aria-hidden="true" className="text-xl text-gold transition group-open:rotate-45">+</span></summary><p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-8 text-slate-600">{answer}</p></details>)}</div><div className="mt-10 text-center"><Link href="/contact" className="inline-flex rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white">تماس با تیوانا</Link></div></div>;
}
