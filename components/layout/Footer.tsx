import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* بخش اصلی فوتر */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-wide">
            <Image
              src="/images/tivanalogo.png"
              alt="Tivana logo"
              width={80}
              height={80}
              className="h-10 w-10 rounded-full object-cover"
              priority
            />
            <span className="hidden text-base font-semibold text-gold sm:inline">
              گالری طلای تیوانا
            </span>
          </Link>
          <h3 className="text-lg font-semibold text-gold"></h3>

          <p className="text-sm leading-7 text-slate-200">
            گالری طلا تیوانا با الهام از فرهنگ و هنر ایران، مجموعه‌ای از جواهرات دست‌ساز و مدرن را با تضمین اصالت و کیفیت برای لحظات خاص شما ارائه می‌کند.
          </p>
          <p className="text-sm text-slate-300">
            تجربه خرید لوکس، بسته‌بندی ویژه و ارسال اکسپرس به سراسر کشور.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-gold">لینک‌های مهم</h4>
          <ul className="space-y-3 text-sm text-slate-200">
            <li><Link href="/" className="transition hover:text-gold">خانه</Link></li>
            <li><Link href="/#categories" className="transition hover:text-gold">دسته‌بندی‌ها</Link></li>
            <li><Link href="/#collections" className="transition hover:text-gold">کلکسیون‌ها</Link></li>
            <li><Link href="/#brand-story" className="transition hover:text-gold">داستان برند</Link></li>
            <li><Link href="/contact" className="transition hover:text-gold">تماس با ما</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-gold">راه‌های ارتباط</h4>
          <ul className="space-y-3 text-sm text-slate-200">
            <li>تلفن: ۰۲۱-۴۱۲۳۴</li>
            <li>واتساپ: ۰۹۲۱۰۰۰۰۰۰۰</li>
            <li>اینستاگرام: @tajgallery</li>
            <li>آدرس: تهران، خیابان ولیعصر، پلاک ۱۲۳</li>
          </ul>
        </div>

        <div className="space-y-3 text-sm text-slate-200">
          <h4 className="mb-4 text-sm font-semibold text-gold">خدمات ویژه</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-gold"></span>
              <span>ارسال امن و بیمه‌شده به سراسر کشور</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-gold"></span>
              <span>تضمین اصالت و فاکتور رسمی</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-gold"></span>
              <span>امکان تعویض و سایز رایگان</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-gold"></span>
              <span>پشتیبانی اختصاصی و مشاوره خرید</span>
            </div>
          </div>
        </div>
      </div>

      {/* ردیف پایینی کپی‌رایت */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-slate-300 md:flex-row">
          <p>© تمامی حقوق برای گالری طلا تیوانا محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
