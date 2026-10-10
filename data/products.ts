export type Category = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  code: string;
  weight: number;
  karat: 18;
  color: "طلایی" | "رزگلد" | "سفید";
  status: "آماده ارسال" | "سفارشی";
  description: string;
  features: string[];
  featured?: boolean;
  isNew?: boolean;
};

export const categories: Category[] = [
  {
    slug: "earring",
    name: "گوشواره",
    shortDescription: "از میخی‌های ظریف تا حلقه‌ای‌های روزمره",
    description: "گوشواره‌های طلای ۱۸ عیار تیوانا با تمرکز بر سبکی، راحتی و فرم‌های ماندگار برای استفاده روزانه و مهمانی انتخاب شده‌اند.",
    image: "/images/earring1.webp",
  },
  {
    slug: "necklace",
    name: "گردنبند",
    shortDescription: "زنجیر و آویزهای مینیمال برای هر استایل",
    description: "مجموعه گردنبندهای تیوانا از زنجیرهای مینیمال و آویزهای نمادین تشکیل شده و به‌تنهایی یا به‌صورت لایه‌ای قابل استفاده است.",
    image: "/images/necklace1.webp",
  },
  {
    slug: "bracelet",
    name: "دستبند",
    shortDescription: "طراحی‌های نرم، سبک و مناسب استفاده مداوم",
    description: "دستبندهای ظریف و زنجیری تیوانا با قفل مطمئن و پرداخت دقیق، برای ترکیب با ساعت یا استفاده تکی طراحی شده‌اند.",
    image: "/images/bracelet1.webp",
  },
  {
    slug: "ring",
    name: "انگشتر",
    shortDescription: "فرم‌های مدرن و کلاسیک در طلای ۱۸ عیار",
    description: "انگشترهای تیوانا با فرم‌های ساده، بافت‌دار و نگین‌دار عرضه می‌شوند. پیش از ثبت درخواست، راهنمای سایز را بررسی کنید.",
    image: "/images/ring1.webp",
  },
  {
    slug: "parsian",
    name: "پلاک پارسیان",
    shortDescription: "هدیه‌ای ارزشمند با وزن‌های کاربردی",
    description: "پلاک‌های پارسیان بسته‌بندی‌شده برای هدیه و پس‌انداز در وزن‌های متنوع ارائه می‌شوند. قیمت نهایی بر اساس نرخ روز تأیید خواهد شد.",
    image: "/images/product-parsian.webp",
  },
];

type ProductSeed = Omit<Product, "karat">;

const productSeeds: ProductSeed[] = [
  { id: "earring-ava", name: "گوشواره آوا", price: 46_800_000, image: "/images/product-earring-atelier.webp", category: "earring", code: "TV-E101", weight: 1.62, color: "طلایی", status: "آماده ارسال", description: "گوشواره آویز سبک با فرم قطره‌ای پیوسته؛ انتخابی مینیمال برای استایل روزمره و رسمی.", features: ["قفل میخی", "پرداخت براق", "مناسب استفاده روزانه"], featured: true, isNew: true },
  { id: "earring-hana", name: "گوشواره هانا", price: 39_500_000, image: "/images/earring1.webp", category: "earring", code: "TV-E102", weight: 1.35, color: "طلایی", status: "آماده ارسال", description: "حلقه‌ای کوچک و خوش‌فرم با سطح صیقلی؛ ساده، سبک و هماهنگ با هر ترکیب روزانه.", features: ["قفل حلقه‌ای", "بدون نگین", "لبه‌های نرم"], featured: true },
  { id: "earring-nika", name: "گوشواره نیکا", price: 54_200_000, image: "/images/product-earring-atelier.webp", category: "earring", code: "TV-E103", weight: 1.88, color: "رزگلد", status: "سفارشی", description: "آویز کشیده با پیچش ظریف و رنگ رزگلد؛ مناسب برای استایل‌های گرم و زنانه.", features: ["ساخت سفارشی", "آبکاری رزگلد", "قفل میخی"] },
  { id: "earring-mah", name: "گوشواره ماه", price: 32_900_000, image: "/images/earring1.webp", category: "earring", code: "TV-E104", weight: 1.12, color: "طلایی", status: "آماده ارسال", description: "گوشواره حلقه‌ای جمع‌وجور با حجم متعادل برای کسانی که سادگی را به جزئیات شلوغ ترجیح می‌دهند.", features: ["سبک و راحت", "سطح براق", "مناسب هدیه"] },
  { id: "necklace-khorshid", name: "گردنبند خورشید", price: 58_600_000, image: "/images/product-necklace-sun.webp", category: "necklace", code: "TV-N201", weight: 2.04, color: "طلایی", status: "آماده ارسال", description: "آویز خورشید با زنجیر ظریف و انعکاس گرم؛ نمادی از انرژی و شروع‌های روشن.", features: ["طول زنجیر ۴۲ سانتی‌متر", "قفل فنری", "آویز ثابت"], featured: true, isNew: true },
  { id: "necklace-saye", name: "گردنبند سایه", price: 44_900_000, image: "/images/necklace1.webp", category: "necklace", code: "TV-N202", weight: 1.55, color: "طلایی", status: "آماده ارسال", description: "مدال دایره‌ای ساده روی زنجیر ظریف؛ قطعه‌ای همیشه‌قابل‌استفاده برای استایل لایه‌ای.", features: ["طول قابل تنظیم", "مدال مینیمال", "پرداخت آینه‌ای"], featured: true },
  { id: "necklace-royan", name: "گردنبند رویان", price: 69_800_000, image: "/images/product-necklace-sun.webp", category: "necklace", code: "TV-N203", weight: 2.44, color: "رزگلد", status: "سفارشی", description: "گردنبند نمادین با آویز خورشیدی و امکان سفارش در رنگ رزگلد برای هدیه‌ای شخصی‌تر.", features: ["ساخت سفارشی", "طول ۴۵ سانتی‌متر", "بسته‌بندی هدیه"] },
  { id: "necklace-parvaz", name: "گردنبند پرواز", price: 51_300_000, image: "/images/necklace1.webp", category: "necklace", code: "TV-N204", weight: 1.79, color: "طلایی", status: "آماده ارسال", description: "زنجیر سبک با آویزی ساده و متناسب؛ مناسب هدیه و استفاده مداوم.", features: ["قفل فنری", "زنجیر ظریف", "بدون نگین"] },
  { id: "bracelet-radin", name: "دستبند رادین", price: 83_400_000, image: "/images/bracelet1.webp", category: "bracelet", code: "TV-B301", weight: 2.96, color: "طلایی", status: "آماده ارسال", description: "دستبند زنجیری با حلقه‌های کشیده و فرم امروزی؛ خوش‌نشین روی مچ و مناسب استفاده تکی.", features: ["طول ۱۸ سانتی‌متر", "قفل خرچنگی", "لینک‌های توخالی سبک"], featured: true },
  { id: "bracelet-darya", name: "دستبند دریا", price: 67_200_000, image: "/images/bracelet1.webp", category: "bracelet", code: "TV-B302", weight: 2.35, color: "طلایی", status: "آماده ارسال", description: "زنجیر نرم با چیدمان ریتمیک حلقه‌ها؛ مناسب ترکیب با ساعت و دستبندهای ظریف‌تر.", features: ["قابل تنظیم", "قفل خرچنگی", "پرداخت براق"], isNew: true },
  { id: "bracelet-aran", name: "دستبند آران", price: 76_900_000, image: "/images/bracelet1.webp", category: "bracelet", code: "TV-B303", weight: 2.72, color: "رزگلد", status: "سفارشی", description: "نسخه رزگلد دستبند زنجیری تیوانا با امکان ساخت در طول دلخواه.", features: ["ساخت سفارشی", "طول دلخواه", "آبکاری رزگلد"] },
  { id: "bracelet-nava", name: "دستبند نوا", price: 61_500_000, image: "/images/bracelet1.webp", category: "bracelet", code: "TV-B304", weight: 2.14, color: "طلایی", status: "آماده ارسال", description: "دستبند سبک و ساده برای استفاده روزمره، با فرم پیوسته و قفل مطمئن.", features: ["سبک", "قفل ایمن", "بدون نگین"] },
  { id: "ring-alma", name: "انگشتر آلما", price: 72_400_000, image: "/images/ring1.webp", category: "ring", code: "TV-R401", weight: 2.58, color: "طلایی", status: "آماده ارسال", description: "انگشتر گنبدی با حجم نرم و سطح آینه‌ای؛ یک قطعه شاخص با طراحی مینیمال.", features: ["سایز ۵۴", "قابل تغییر سایز", "سطح آینه‌ای"], featured: true },
  { id: "ring-helia", name: "انگشتر هلیا", price: 64_700_000, image: "/images/ring1.webp", category: "ring", code: "TV-R402", weight: 2.29, color: "طلایی", status: "سفارشی", description: "حلقه‌ای مدرن با فرم پهن و نرم که در سایز انتخابی شما ساخته می‌شود.", features: ["سایز سفارشی", "بدون نگین", "لبه نرم"], isNew: true },
  { id: "ring-sahar", name: "انگشتر سحر", price: 57_800_000, image: "/images/ring1.webp", category: "ring", code: "TV-R403", weight: 2.01, color: "رزگلد", status: "سفارشی", description: "فرم کلاسیک و ساده با رنگ رزگلد؛ مناسب استفاده تکی یا ترکیب با حلقه‌های باریک.", features: ["رنگ سفارشی", "سایز ۵۲ تا ۵۸", "پرداخت براق"] },
  { id: "ring-niloufar", name: "انگشتر نیلوفر", price: 79_900_000, image: "/images/ring1.webp", category: "ring", code: "TV-R404", weight: 2.84, color: "طلایی", status: "آماده ارسال", description: "انگشتر حجیم و ساده با الهام از فرم گلبرگ؛ مناسب استایل‌های جسورانه و امروزی.", features: ["سایز ۵۵", "قابل تغییر سایز", "بدون نگین"] },
  { id: "parsian-300", name: "پلاک پارسیان ۳۰۰ سوت", price: 9_800_000, image: "/images/product-parsian.webp", category: "parsian", code: "TV-P503", weight: 0.3, color: "طلایی", status: "آماده ارسال", description: "پلاک طلای پارسیان ۱۸ عیار در بسته‌بندی پلمب؛ مناسب هدیه‌های کوچک و ارزشمند.", features: ["وزن ۳۰۰ سوت", "بسته‌بندی پلمب", "مناسب هدیه"], featured: true },
  { id: "parsian-500", name: "پلاک پارسیان ۵۰۰ سوت", price: 16_100_000, image: "/images/product-parsian.webp", category: "parsian", code: "TV-P505", weight: 0.5, color: "طلایی", status: "آماده ارسال", description: "نیم‌گرم طلای ۱۸ عیار بسته‌بندی‌شده برای هدیه، پس‌انداز و مناسبت‌های رسمی.", features: ["وزن نیم گرم", "بسته‌بندی پلمب", "کارت مشخصات"], isNew: true },
  { id: "parsian-750", name: "پلاک پارسیان ۷۵۰ سوت", price: 24_000_000, image: "/images/product-parsian.webp", category: "parsian", code: "TV-P507", weight: 0.75, color: "طلایی", status: "آماده ارسال", description: "پلاک ۷۵۰ سوت با بسته‌بندی محافظ؛ انتخابی متعادل برای هدیه‌های ماندگار.", features: ["وزن ۷۵۰ سوت", "پلمب محافظ", "قیمت بر اساس نرخ روز"] },
  { id: "parsian-1000", name: "پلاک پارسیان یک گرم", price: 31_900_000, image: "/images/product-parsian.webp", category: "parsian", code: "TV-P510", weight: 1, color: "طلایی", status: "آماده ارسال", description: "یک گرم طلای ۱۸ عیار پلمب‌شده؛ گزینه‌ای کاربردی برای هدیه و پس‌انداز تدریجی.", features: ["وزن یک گرم", "بسته‌بندی پلمب", "قیمت بر اساس نرخ روز"] },
];

export const products: Product[] = productSeeds.map((product) => ({ ...product, karat: 18 }));
export const featuredProducts = products.filter((product) => product.featured);
export const getProductById = (id: string) => products.find((product) => product.id === id);
export const getCategoryBySlug = (slug: string) => categories.find((category) => category.slug === slug);
