export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();

export const siteConfig = {
  name: "گالری طلای تیوانا",
  shortName: "تیوانا",
  description:
    "کلکسیون زیورآلات طلای ۱۸ عیار تیوانا؛ مشاهده مشخصات، مقایسه مدل‌ها و ثبت درخواست خرید.",
  locale: "fa_IR",
};
