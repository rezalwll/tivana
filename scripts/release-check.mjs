import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];

const parseEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) return {};

  return Object.fromEntries(
    fs
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim().replace(/^(['"])(.*)\1$/, "$2");
        return [key, value];
      })
  );
};

const fileEnv = parseEnvFile(path.join(root, ".env.local"));
const env = { ...fileEnv, ...process.env };
const value = (key) => env[key]?.trim() ?? "";
const isConfirmed = (key) => value(key).toLowerCase() === "true";

const siteUrl = value("NEXT_PUBLIC_SITE_URL");
try {
  const parsed = new URL(siteUrl);
  if (parsed.protocol !== "https:") failures.push("NEXT_PUBLIC_SITE_URL باید با https شروع شود.");
  if (parsed.hostname === "localhost" || parsed.hostname.endsWith(".example")) {
    failures.push("NEXT_PUBLIC_SITE_URL هنوز دامنهٔ واقعی نیست.");
  }
} catch {
  failures.push("NEXT_PUBLIC_SITE_URL تنظیم نشده یا معتبر نیست.");
}

const contactKeys = [
  "NEXT_PUBLIC_CONTACT_PHONE",
  "NEXT_PUBLIC_WHATSAPP_NUMBER",
  "NEXT_PUBLIC_INSTAGRAM_HANDLE",
  "NEXT_PUBLIC_CONTACT_EMAIL",
];
if (!contactKeys.some((key) => value(key))) {
  failures.push("حداقل یک راه ارتباطی رسمی در .env.local وارد کنید.");
}

const whatsapp = value("NEXT_PUBLIC_WHATSAPP_NUMBER").replace(/\D/g, "");
if (whatsapp && (!/^98\d{10}$/.test(whatsapp) || /0{6,}/.test(whatsapp))) {
  failures.push("شماره واتساپ باید با قالب بین‌المللی ایران مانند 989121234567 وارد شود.");
}

const phone = value("NEXT_PUBLIC_CONTACT_PHONE").replace(/\D/g, "");
if (phone && (phone.length < 10 || /0{6,}/.test(phone) || phone === "09210000000")) {
  failures.push("شماره تماس رسمی معتبر نیست یا همچنان مقدار نمونهٔ قدیمی است.");
}

const instagram = value("NEXT_PUBLIC_INSTAGRAM_HANDLE").replace(/^@/, "").toLowerCase();
if (instagram && (instagram === "tajgallery" || instagram.includes("example"))) {
  failures.push("شناسه اینستاگرام هنوز یک مقدار نمونه یا مقدار ساختگی تاریخچهٔ پروژه است.");
}

const email = value("NEXT_PUBLIC_CONTACT_EMAIL").toLowerCase();
if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.endsWith("@example.com"))) {
  failures.push("ایمیل تماس معتبر نیست یا هنوز از دامنهٔ نمونه استفاده می‌کند.");
}

if (!isConfirmed("TIVANA_CATALOG_CONFIRMED")) {
  failures.push("پس از تطبیق نام، تصویر، وزن، قیمت و موجودی همه محصولات، TIVANA_CATALOG_CONFIRMED=true را ثبت کنید.");
}
if (!isConfirmed("TIVANA_POLICIES_CONFIRMED")) {
  failures.push("پس از تأیید قوانین ارسال، پرداخت و بازگشت، TIVANA_POLICIES_CONFIRMED=true را ثبت کنید.");
}

const productsPath = path.join(root, "data/products.ts");
const source = fs.readFileSync(productsPath, "utf8");
const seedStart = source.indexOf("const productSeeds");
const seedEnd = source.indexOf("export const products");
if (seedStart === -1 || seedEnd === -1 || seedEnd <= seedStart) {
  failures.push("بخش productSeeds در data/products.ts قابل شناسایی نیست.");
}
const productSource = source.slice(Math.max(0, seedStart), seedEnd === -1 ? source.length : seedEnd);
const ids = [...productSource.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
const codes = [...productSource.matchAll(/\bcode:\s*"([^"]+)"/g)].map((match) => match[1]);
const productImages = [...productSource.matchAll(/\bimage:\s*"(\/images\/[^"]+)"/g)].map((match) => match[1]);
const allImages = [...source.matchAll(/\bimage:\s*"(\/images\/[^"]+)"/g)].map((match) => match[1]);

const duplicates = (items) => [...new Set(items.filter((item, index) => items.indexOf(item) !== index))];
if (ids.length < 20) failures.push(`کاتالوگ فقط ${ids.length} محصول دارد؛ حداقل مورد انتظار ۲۰ محصول است.`);
if (duplicates(ids).length) failures.push(`شناسه محصول تکراری است: ${duplicates(ids).join(", ")}`);
if (duplicates(codes).length) failures.push(`کد محصول تکراری است: ${duplicates(codes).join(", ")}`);

const missingImages = [...new Set(allImages)].filter(
  (image) => !fs.existsSync(path.join(root, "public", image))
);
if (missingImages.length) failures.push(`تصویر محصول پیدا نشد: ${missingImages.join(", ")}`);

const repeatedImages = duplicates(productImages);
if (repeatedImages.length) {
  if (!isConfirmed("TIVANA_SHARED_PRODUCT_IMAGES_CONFIRMED")) {
    failures.push(`چند محصول از تصویر مشترک استفاده می‌کنند: ${repeatedImages.join(", ")}. اگر این اشتراک عمدی و تأییدشده است، TIVANA_SHARED_PRODUCT_IMAGES_CONFIRMED=true را ثبت کنید.`);
  } else {
    warnings.push(`اشتراک تصویر میان محصولات به‌صورت صریح تأیید شده است: ${repeatedImages.join(", ")}`);
  }
}

console.log(`محصولات بررسی‌شده: ${ids.length}`);
console.log(`تصاویر یکتای محصولات: ${new Set(productImages).size}`);
for (const warning of warnings) console.warn(`هشدار: ${warning}`);

if (failures.length) {
  console.error("\nآمادگی انتشار تأیید نشد:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nگیت اطلاعات تجاری و ساختاری انتشار با موفقیت پاس شد.");
