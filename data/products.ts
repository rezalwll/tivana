export type Category = {
  slug: string;
  name: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
};

// لیست دسته‌بندی‌ها برای بخش‌های مختلف صفحه
export const categories: Category[] = [
  { slug: "earring", name: "گوشواره", image: "/images/earring1.png" },
  { slug: "necklace", name: "گردنبند", image: "/images/necklace1.png" },
  { slug: "bracelet", name: "دستبند", image: "/images/bracelet1.png" },
  { slug: "ring", name: "انگشتر", image: "/images/ring1.png" },
  { slug: "zananeh", name: "طلای زنانه", image: "/images/22.png" },
  { slug: "mardaneh", name: "طلای مردانه", image: "/images/22.png" },
  { slug: "parsian", name: "شمش پارسیان", image: "/images/22.png" },
  { slug: "kids", name: "طلای کودکانه", image: "/images/22.png" }
];

// نمونه محصولات برای پیش‌نمایش بخش‌ها
export const products: Product[] = [
  {
    id: "p-1",
    name: "گردنبند رگ مرزی",
    price: 18400000,
    image: "/images/22.png",
    category: "zananeh",
    tags: ["جدید"]
  },
  {
    id: "p-2",
    name: "گوشواره میخی پرتو",
    price: 9200000,
    image: "/images/22.png",
    category: "zananeh"
  },
  {
    id: "p-3",
    name: "دستبند زنجیر هارمونی",
    price: 11650000,
    image: "/images/22.png",
    category: "zananeh"
  },
  {
    id: "p-4",
    name: "انگشتر الماس خطی",
    price: 13700000,
    image: "/images/22.png",
    category: "zananeh"
  },
  {
    id: "p-5",
    name: "ساعت و دستبند مردانه آذرخش",
    price: 22900000,
    image: "/images/22.png",
    category: "mardaneh"
  },
  {
    id: "p-6",
    name: "زنجیر کارتیر پهن",
    price: 18500000,
    image: "/images/22.png",
    category: "mardaneh",
    tags: ["پرفروش"]
  },
  {
    id: "p-7",
    name: "شمش پارسیان ۱۰ گرمی",
    price: 15280000,
    image: "/images/22.png",
    category: "parsian",
    tags: ["سرمایه‌گذاری"]
  },
  {
    id: "p-8",
    name: "شمش پارسیان ۲۰ گرمی",
    price: 30460000,
    image: "/images/22.png",
    category: "parsian"
  },
  {
    id: "p-9",
    name: "پک هدایای تولد دخترانه",
    price: 7800000,
    image: "/images/22.png",
    category: "kids"
  },
  {
    id: "p-10",
    name: "دستبند ظریف کودک تیوانا",
    price: 5200000,
    image: "/images/22.png",
    category: "kids"
  },
  {
    id: "p-11",
    name: "گردنبند صلیبی استار",
    price: 12800000,
    image: "/images/22.png",
    category: "mardaneh"
  },
  {
    id: "p-12",
    name: "پک نامزدی الماسه",
    price: 45800000,
    image: "/images/22.png",
    category: "zananeh",
    tags: ["ویژه"]
  }
];

export const featuredCategorySlugs = ["zananeh", "mardaneh", "parsian", "kids"];
