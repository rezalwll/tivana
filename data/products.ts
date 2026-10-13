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
  style: "روزمره" | "مجلسی" | "هدیه" | "سرمایه‌گذاری";
  details: { label: string; value: string }[];
  styling: string;
  care: string;
  featured?: boolean;
  isNew?: boolean;
};

export const categories: Category[] = [
  {
    slug: "earring",
    name: "گوشواره",
    shortDescription: "از میخی‌های ظریف تا حلقه‌ای‌های روزمره",
    description: "گوشواره‌های طلای ۱۸ عیار تیوانا با تمرکز بر سبکی، راحتی و فرم‌های ماندگار برای استفاده روزانه و مهمانی انتخاب شده‌اند.",
    image: "/images/products/earring-ava.webp",
  },
  {
    slug: "necklace",
    name: "گردنبند",
    shortDescription: "زنجیر و آویزهای مینیمال برای هر استایل",
    description: "مجموعه گردنبندهای تیوانا از زنجیرهای مینیمال و آویزهای نمادین تشکیل شده و به‌تنهایی یا به‌صورت لایه‌ای قابل استفاده است.",
    image: "/images/products/necklace-khorshid.webp",
  },
  {
    slug: "bracelet",
    name: "دستبند",
    shortDescription: "طراحی‌های نرم، سبک و مناسب استفاده مداوم",
    description: "دستبندهای ظریف و زنجیری تیوانا با قفل مطمئن و پرداخت دقیق، برای ترکیب با ساعت یا استفاده تکی طراحی شده‌اند.",
    image: "/images/products/bracelet-radin.webp",
  },
  {
    slug: "ring",
    name: "انگشتر",
    shortDescription: "فرم‌های مدرن و کلاسیک در طلای ۱۸ عیار",
    description: "انگشترهای تیوانا با فرم‌های ساده، بافت‌دار و نگین‌دار عرضه می‌شوند. پیش از ثبت درخواست، راهنمای سایز را بررسی کنید.",
    image: "/images/products/ring-niloufar.webp",
  },
  {
    slug: "parsian",
    name: "پلاک پارسیان",
    shortDescription: "هدیه‌ای ارزشمند با وزن‌های کاربردی",
    description: "پلاک‌های پارسیان بسته‌بندی‌شده برای هدیه و پس‌انداز در وزن‌های متنوع ارائه می‌شوند. قیمت نهایی بر اساس نرخ روز تأیید خواهد شد.",
    image: "/images/products/parsian-1000.webp",
  },
];

type ProductSeed = Omit<Product, "karat">;

const productSeeds: ProductSeed[] = [
  { id: "earring-ava", name: "گوشواره آوا", price: 46_800_000, image: "/images/products/earring-ava.webp", category: "earring", code: "TV-E101", weight: 1.62, color: "طلایی", status: "آماده ارسال", style: "مجلسی", description: "گوشواره آویز سبک با فرم قطره‌ای باز و خطوط کشیده؛ در حرکت نور را نرم بازتاب می‌دهد و برای استایل روز تا شب مناسب است.", features: ["قفل میخی پروانه‌ای", "فرم قطره‌ای توخالی", "پرداخت براق"], details: [{ label: "طول", value: "۳۲ میلی‌متر" }, { label: "عرض", value: "۱۴ میلی‌متر" }, { label: "نوع قفل", value: "میخی پروانه‌ای" }, { label: "فینیش", value: "صیقلی براق" }], styling: "با یقه باز یا موهای جمع‌شده، فرم کشیده آوا بهتر دیده می‌شود.", care: "پس از استفاده با پارچه نرم و خشک پاک کنید و جدا از قطعات دیگر در کیسه پارچه‌ای نگه دارید.", featured: true, isNew: true },
  { id: "earring-hana", name: "گوشواره هانا", price: 39_500_000, image: "/images/products/earring-hana.webp", category: "earring", code: "TV-E102", weight: 1.35, color: "طلایی", status: "آماده ارسال", style: "روزمره", description: "حلقه‌ای کوچک و حجیم با سطح صیقلی و لبه‌های نرم؛ سبک، راحت و مناسب استفاده مداوم.", features: ["قفل لولایی کلیکی", "بدون نگین", "لبه‌های نرم"], details: [{ label: "قطر بیرونی", value: "۱۳ میلی‌متر" }, { label: "پهنای حلقه", value: "۴ میلی‌متر" }, { label: "نوع قفل", value: "لولایی کلیکی" }, { label: "فینیش", value: "براق" }], styling: "برای استایل مینیمال به‌تنهایی و برای ترکیب چندگوشواره در سوراخ اول استفاده شود.", care: "پیش از حمام، شنا و ورزش خارج کنید و از تماس مستقیم با عطر و کرم دور نگه دارید.", featured: true },
  { id: "earring-nika", name: "گوشواره نیکا", price: 54_200_000, image: "/images/products/earring-nika.webp", category: "earring", code: "TV-E103", weight: 1.88, color: "رزگلد", status: "سفارشی", style: "مجلسی", description: "آویز رزگلد با پیچش مجسمه‌وار و انعکاس گرم؛ قطعه‌ای شاخص برای استایل‌های ساده و تک‌رنگ.", features: ["ساخت سفارشی", "فینیش رزگلد", "قفل میخی"], details: [{ label: "طول", value: "۳۸ میلی‌متر" }, { label: "عرض", value: "۱۱ میلی‌متر" }, { label: "نوع قفل", value: "میخی پروانه‌ای" }, { label: "زمان ساخت", value: "۷ تا ۱۰ روز کاری" }], styling: "با لباس‌های کرم، شکلاتی یا سرمه‌ای کنتراست گرم و چشمگیری می‌سازد.", care: "برای ماندگاری رنگ، تماس با مواد شوینده و اسپری‌های آرایشی را به حداقل برسانید.", },
  { id: "earring-mah", name: "گوشواره ماه", price: 32_900_000, image: "/images/products/earring-mah.webp", category: "earring", code: "TV-E104", weight: 1.12, color: "طلایی", status: "آماده ارسال", style: "هدیه", description: "حلقه هلالی جمع‌وجور با حجم متعادل؛ انتخابی راحت، همه‌کاره و مناسب هدیه.", features: ["فرم هلالی", "قفل لولایی", "سبک و راحت"], details: [{ label: "قطر", value: "۱۲ میلی‌متر" }, { label: "پهنای نما", value: "۳٫۵ میلی‌متر" }, { label: "نوع قفل", value: "لولایی کلیکی" }, { label: "فینیش", value: "صیقلی" }], styling: "اندازه کوچک آن برای استفاده روزانه و ترکیب با گوشواره میخی ایده‌آل است.", care: "در جعبه خشک و دور از رطوبت نگهداری و پس از هر بار استفاده با پارچه نرم تمیز شود." },
  { id: "necklace-khorshid", name: "گردنبند خورشید", price: 58_600_000, image: "/images/products/necklace-khorshid.webp", category: "necklace", code: "TV-N201", weight: 2.04, color: "طلایی", status: "آماده ارسال", style: "هدیه", description: "مدال خورشیدی با نقش برجسته روی زنجیر کابلی ظریف؛ نمادی روشن برای هدیه و استفاده هر روز.", features: ["زنجیر کابلی", "قفل فنری", "مدال نقش‌برجسته"], details: [{ label: "طول زنجیر", value: "۴۲ سانتی‌متر" }, { label: "قطر آویز", value: "۱۵ میلی‌متر" }, { label: "نوع قفل", value: "فنری" }, { label: "نوع آویز", value: "متحرک" }], styling: "روی یقه گرد یا هفت کوتاه استفاده کنید؛ با زنجیر ۴۸ سانتی‌متری لایه‌سازی جذابی دارد.", care: "زنجیر را باز و تخت نگه دارید؛ پیش از خواب، ورزش و شنا گردنبند را خارج کنید.", featured: true, isNew: true },
  { id: "necklace-saye", name: "گردنبند سایه", price: 44_900_000, image: "/images/products/necklace-saye.webp", category: "necklace", code: "TV-N202", weight: 1.55, color: "طلایی", status: "آماده ارسال", style: "روزمره", description: "مدال دایره‌ای با فرورفتگی نرم و سطح آینه‌ای روی زنجیر ظریف؛ پایه‌ای مینیمال برای استایل لایه‌ای.", features: ["طول قابل تنظیم", "مدال مینیمال", "پرداخت آینه‌ای"], details: [{ label: "طول زنجیر", value: "۴۰ + ۴ سانتی‌متر" }, { label: "قطر مدال", value: "۱۳ میلی‌متر" }, { label: "نوع زنجیر", value: "کابلی ظریف" }, { label: "نوع قفل", value: "فنری" }], styling: "برای لایه‌سازی، آن را بالاتر از یک آویز کشیده یا زنجیر ۵۰ سانتی‌متری قرار دهید.", care: "سطح آینه‌ای را فقط با پارچه بدون پرز پاک کنید و از ساییده‌شدن به قطعات دیگر جلوگیری کنید.", featured: true },
  { id: "necklace-royan", name: "گردنبند رویان", price: 69_800_000, image: "/images/products/necklace-royan.webp", category: "necklace", code: "TV-N203", weight: 2.44, color: "رزگلد", status: "سفارشی", style: "مجلسی", description: "آویز هاله‌ای رزگلد از دو قوس نامتقارن؛ طراحی معاصر برای هدیه‌ای شخصی و استایل‌های مینیمال.", features: ["ساخت سفارشی", "آویز هاله‌ای", "بسته‌بندی هدیه"], details: [{ label: "طول زنجیر", value: "۴۵ سانتی‌متر" }, { label: "قطر آویز", value: "۲۳ میلی‌متر" }, { label: "نوع قفل", value: "خرچنگی" }, { label: "زمان ساخت", value: "۷ تا ۱۰ روز کاری" }], styling: "آویز حجمی آن روی پارچه‌های ساده و رنگ‌های خنثی بهتر دیده می‌شود.", care: "از تماس طولانی با رطوبت، عطر و مواد شیمیایی پرهیز کنید و آویز را جداگانه نگه دارید." },
  { id: "necklace-parvaz", name: "گردنبند پرواز", price: 51_300_000, image: "/images/products/necklace-parvaz.webp", category: "necklace", code: "TV-N204", weight: 1.79, color: "طلایی", status: "آماده ارسال", style: "هدیه", description: "آویز انتزاعی بال با سه پر نرم و زنجیر قابل تنظیم؛ نمادی ظریف از آزادی و حرکت.", features: ["زنجیر قابل تنظیم", "آویز بدون نگین", "قفل فنری"], details: [{ label: "طول زنجیر", value: "۴۲ + ۳ سانتی‌متر" }, { label: "ابعاد آویز", value: "۲۴ × ۱۸ میلی‌متر" }, { label: "نوع قفل", value: "فنری" }, { label: "فینیش", value: "براق" }], styling: "با یقه هفت یا پیراهن ساده، خطوط آویز پرواز نقطه کانونی استایل می‌شود.", care: "هنگام نگهداری زنجیر را ببندید تا گره نخورد و با پارچه نرم خشک تمیز کنید." },
  { id: "bracelet-radin", name: "دستبند رادین", price: 83_400_000, image: "/images/products/bracelet-radin.webp", category: "bracelet", code: "TV-B301", weight: 2.96, color: "طلایی", status: "آماده ارسال", style: "مجلسی", description: "دستبند پیپرکلیپ با حلقه‌های کشیده و فرم امروزی؛ قطعه‌ای شاخص که به‌تنهایی هم کامل است.", features: ["حلقه‌های کشیده", "قفل خرچنگی", "زنجیر افزایش سایز"], details: [{ label: "طول", value: "۱۷ + ۲ سانتی‌متر" }, { label: "عرض حلقه", value: "۴ میلی‌متر" }, { label: "نوع قفل", value: "خرچنگی" }, { label: "ساختار", value: "لینک سبک" }], styling: "به‌تنهایی روی مچ یا کنار یک دستبند زنجیری بسیار ظریف استفاده شود.", care: "برای جلوگیری از فشار به لینک‌ها هنگام ورزش و خواب خارج کنید و تخت نگه دارید.", featured: true },
  { id: "bracelet-darya", name: "دستبند دریا", price: 67_200_000, image: "/images/products/bracelet-darya.webp", category: "bracelet", code: "TV-B302", weight: 2.35, color: "طلایی", status: "آماده ارسال", style: "روزمره", description: "ترکیب ریتمیک حلقه‌های بیضی و گوی‌های صیقلی؛ نرم روی مچ و مناسب ترکیب با ساعت.", features: ["طول قابل تنظیم", "قفل خرچنگی", "ترکیب لینک و گوی"], details: [{ label: "طول", value: "۱۶٫۵ + ۳ سانتی‌متر" }, { label: "ابعاد لینک", value: "۷ × ۳ میلی‌متر" }, { label: "نوع قفل", value: "خرچنگی" }, { label: "فینیش", value: "براق" }], styling: "برای ترکیب با ساعت، دستبند را در سمت آزادتر مچ قرار دهید تا روی صفحه ساعت نیفتد.", care: "پس از تماس با تعریق با پارچه خشک پاک کنید؛ از کشیدن زنجیر افزایش سایز خودداری شود.", isNew: true },
  { id: "bracelet-aran", name: "دستبند آران", price: 76_900_000, image: "/images/products/bracelet-aran.webp", category: "bracelet", code: "TV-B303", weight: 2.72, color: "رزگلد", status: "سفارشی", style: "مجلسی", description: "زنجیر رزگلد با حلقه‌های بیضی و یک پیچش مجسمه‌وار در مرکز؛ قابل ساخت در طول دلخواه.", features: ["ساخت سفارشی", "لینک مرکزی پیچشی", "طول دلخواه"], details: [{ label: "طول پایه", value: "۱۷ سانتی‌متر" }, { label: "عرض لینک", value: "۵ میلی‌متر" }, { label: "نوع قفل", value: "خرچنگی" }, { label: "زمان ساخت", value: "۷ تا ۱۰ روز کاری" }], styling: "رنگ رزگلد با ساعت چرمی قهوه‌ای و لباس‌های طیف کرم هماهنگی گرمی ایجاد می‌کند.", care: "از برخورد با سطوح زبر و مواد شوینده جلوگیری کنید و در محفظه نرم جداگانه نگه دارید." },
  { id: "bracelet-nava", name: "دستبند نوا", price: 61_500_000, image: "/images/products/bracelet-nava.webp", category: "bracelet", code: "TV-B304", weight: 2.14, color: "طلایی", status: "آماده ارسال", style: "هدیه", description: "دستبند زنجیری ظریف با پلاک میله‌ای صاف؛ طراحی تمیز و همه‌کاره برای هدیه یا استفاده روزانه.", features: ["پلاک میله‌ای", "قفل خرچنگی", "بدون نگین"], details: [{ label: "طول", value: "۱۷٫۵ سانتی‌متر" }, { label: "ابعاد پلاک", value: "۳۲ × ۳ میلی‌متر" }, { label: "نوع زنجیر", value: "کرب ظریف" }, { label: "نوع قفل", value: "خرچنگی" }], styling: "با ساعت یا دستبند مهره‌ای مینیمال ترکیب کنید؛ پلاک را روی مچ تنظیم نگه دارید.", care: "پلاک صیقلی را جدا از سایر زیورآلات نگه دارید تا خط‌وخش سطحی ایجاد نشود." },
  { id: "ring-alma", name: "انگشتر آلما", price: 72_400_000, image: "/images/products/ring-alma.webp", category: "ring", code: "TV-R401", weight: 2.58, color: "طلایی", status: "آماده ارسال", style: "مجلسی", description: "انگشتر گنبدی با حجم نرم، زیره باریک‌تر و سطح آینه‌ای؛ قطعه‌ای شاخص با طراحی مینیمال.", features: ["فرم گنبدی", "قابل تغییر سایز محدود", "سطح آینه‌ای"], details: [{ label: "سایز موجود", value: "۵۴" }, { label: "عرض بیشینه", value: "۹ میلی‌متر" }, { label: "ضخامت", value: "۲٫۲ میلی‌متر" }, { label: "فینیش", value: "آینه‌ای" }], styling: "برای حفظ تمرکز روی فرم گنبدی، آن را به‌تنهایی روی انگشت اشاره یا میانی استفاده کنید.", care: "پیش از کارهای دستی خارج کنید؛ سطح آینه‌ای را با پارچه بسیار نرم و بدون فشار پاک کنید.", featured: true },
  { id: "ring-helia", name: "انگشتر هلیا", price: 64_700_000, image: "/images/products/ring-helia.webp", category: "ring", code: "TV-R402", weight: 2.29, color: "طلایی", status: "سفارشی", style: "مجلسی", description: "حلقه پهن و مجسمه‌وار با دو موج هم‌پوشان؛ در سایز انتخابی شما ساخته می‌شود.", features: ["سایز سفارشی", "فرم موجی", "لبه‌های نرم"], details: [{ label: "بازه سایز", value: "۵۰ تا ۶۰" }, { label: "عرض نما", value: "۱۰ میلی‌متر" }, { label: "فینیش", value: "صیقلی" }, { label: "زمان ساخت", value: "۷ تا ۱۰ روز کاری" }], styling: "به دلیل پهنای حلقه، اگر بین دو سایز هستید معمولاً سایز بزرگ‌تر راحت‌تر خواهد بود.", care: "هنگام شست‌وشو، ورزش و تماس با مواد شوینده خارج شود و در محفظه پارچه‌ای نگه دارید.", isNew: true },
  { id: "ring-sahar", name: "انگشتر سحر", price: 57_800_000, image: "/images/products/ring-sahar.webp", category: "ring", code: "TV-R403", weight: 2.01, color: "رزگلد", status: "سفارشی", style: "روزمره", description: "حلقه باریک رزگلد با موج نامتقارن؛ مناسب استفاده تکی یا چیدمان کنار حلقه‌های ساده.", features: ["رنگ رزگلد", "سایز سفارشی", "مناسب چیدمان"], details: [{ label: "بازه سایز", value: "۵۲ تا ۵۸" }, { label: "عرض", value: "۲٫۸ میلی‌متر" }, { label: "فینیش", value: "براق" }, { label: "زمان ساخت", value: "۵ تا ۸ روز کاری" }], styling: "در کنار یک حلقه صاف زرد یا رزگلد، موج سحر ترکیبی ظریف و شخصی می‌سازد.", care: "برای جلوگیری از سایش، حلقه‌های چیدمان را با فشار زیاد کنار هم قرار ندهید." },
  { id: "ring-niloufar", name: "انگشتر نیلوفر", price: 79_900_000, image: "/images/products/ring-niloufar.webp", category: "ring", code: "TV-R404", weight: 2.84, color: "طلایی", status: "آماده ارسال", style: "مجلسی", description: "انگشتر مجسمه‌وار با سه گلبرگ باز و مرکز خالی؛ طراحی جسورانه با الهام از نیلوفر.", features: ["فرم سه‌گلبرگ", "قابل تغییر سایز محدود", "بدون نگین"], details: [{ label: "سایز موجود", value: "۵۵" }, { label: "ارتفاع نما", value: "۱۸ میلی‌متر" }, { label: "عرض حلقه", value: "۴ میلی‌متر" }, { label: "فینیش", value: "براق" }], styling: "به‌تنهایی روی دست استفاده کنید و باقی زیورآلات را ظریف نگه دارید تا فرم گلبرگ‌ها دیده شود.", care: "از واردشدن فشار به گلبرگ‌ها جلوگیری کنید و برای تمیزکردن شیارها از پارچه نرم استفاده کنید." },
  { id: "parsian-300", name: "پلاک پارسیان ۳۰۰ سوت", price: 9_800_000, image: "/images/products/parsian-300.webp", category: "parsian", code: "TV-P503", weight: 0.3, color: "طلایی", status: "آماده ارسال", style: "سرمایه‌گذاری", description: "پلاک طلای ۱۸ عیار در کارت محافظ پلمب؛ وزن کم و کاربردی برای هدیه‌های کوچک و پس‌انداز مرحله‌ای.", features: ["وزن ۳۰۰ سوت", "کارت محافظ پلمب", "مناسب هدیه"], details: [{ label: "وزن خالص", value: "۰٫۳ گرم" }, { label: "عیار", value: "۱۸ عیار" }, { label: "نوع بسته‌بندی", value: "کارت محافظ پلمب" }, { label: "وضعیت", value: "آماده تحویل" }], styling: "برای هدیه‌های مناسبتی کوچک، در پاکت یا جعبه هدیه تیوانا ارائه می‌شود.", care: "برای حفظ اعتبار بسته‌بندی، پلمب را باز نکنید و کارت را دور از گرما، رطوبت و فشار نگه دارید.", featured: true },
  { id: "parsian-500", name: "پلاک پارسیان ۵۰۰ سوت", price: 16_100_000, image: "/images/products/parsian-500.webp", category: "parsian", code: "TV-P505", weight: 0.5, color: "طلایی", status: "آماده ارسال", style: "سرمایه‌گذاری", description: "نیم‌گرم طلای ۱۸ عیار در بسته‌بندی محافظ؛ انتخابی متعادل برای هدیه، پس‌انداز و مناسبت‌های رسمی.", features: ["وزن نیم‌گرم", "بسته‌بندی پلمب", "کارت مشخصات"], details: [{ label: "وزن خالص", value: "۰٫۵ گرم" }, { label: "عیار", value: "۱۸ عیار" }, { label: "نوع بسته‌بندی", value: "کارت محافظ پلمب" }, { label: "وضعیت", value: "آماده تحویل" }], styling: "گزینه‌ای جمع‌وجور برای هدیه تولد، فارغ‌التحصیلی یا پس‌انداز منظم است.", care: "کارت را خم نکنید، پلمب را باز نکنید و رسید خرید را همراه آن نگه دارید.", isNew: true },
  { id: "parsian-750", name: "پلاک پارسیان ۷۵۰ سوت", price: 24_000_000, image: "/images/products/parsian-750.webp", category: "parsian", code: "TV-P507", weight: 0.75, color: "طلایی", status: "آماده ارسال", style: "سرمایه‌گذاری", description: "پلاک ۷۵۰ سوت با کارت شفاف پلمب و نقش هندسی؛ وزنی میانه برای هدیه‌ای ماندگار.", features: ["وزن ۷۵۰ سوت", "پلمب محافظ", "قیمت بر اساس نرخ روز"], details: [{ label: "وزن خالص", value: "۰٫۷۵ گرم" }, { label: "عیار", value: "۱۸ عیار" }, { label: "نوع بسته‌بندی", value: "کارت محافظ پلمب" }, { label: "وضعیت", value: "آماده تحویل" }], styling: "برای هدیه‌های رسمی‌تر و شروع پس‌انداز طلای کم‌حجم انتخاب مناسبی است.", care: "بسته‌بندی را در جای خشک و تخت نگه دارید و از خراش‌دادن یا بازکردن پلمب خودداری کنید." },
  { id: "parsian-1000", name: "پلاک پارسیان یک گرم", price: 31_900_000, image: "/images/products/parsian-1000.webp", category: "parsian", code: "TV-P510", weight: 1, color: "طلایی", status: "آماده ارسال", style: "سرمایه‌گذاری", description: "یک گرم طلای ۱۸ عیار پلمب‌شده با نقش موجی؛ گزینه‌ای کاربردی برای هدیه و پس‌انداز تدریجی.", features: ["وزن یک گرم", "بسته‌بندی پلمب", "قیمت بر اساس نرخ روز"], details: [{ label: "وزن خالص", value: "۱ گرم" }, { label: "عیار", value: "۱۸ عیار" }, { label: "نوع بسته‌بندی", value: "کارت محافظ پلمب" }, { label: "وضعیت", value: "آماده تحویل" }], styling: "وزن یک‌گرمی برای هدیه‌های مهم‌تر و تکمیل سبد پس‌انداز کوچک مناسب است.", care: "برای حفظ اصالت ظاهری، کارت پلمب را باز نکنید و فاکتور و بسته‌بندی را کنار هم نگه دارید." },
];

export const products: Product[] = productSeeds.map((product) => ({ ...product, karat: 18 }));
export const featuredProducts = products.filter((product) => product.featured);
export const getProductById = (id: string) => products.find((product) => product.id === id);
export const getCategoryBySlug = (slug: string) => categories.find((category) => category.slug === slug);
