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
  { slug: "earring", name: "گوشواره", image: "/images/categories/earring.jpg" },
  { slug: "necklace", name: "گردنبند", image: "/images/categories/necklace.jpg" },
  { slug: "bracelet", name: "دستبند", image: "/images/categories/bracelet.jpg" },
  { slug: "ring", name: "انگشتر", image: "/images/categories/ring.jpg" },
  { slug: "zananeh", name: "طلای زنانه", image: "/images/categories/women.jpg" },
  { slug: "mardaneh", name: "طلای مردانه", image: "/images/categories/men.jpg" },
  { slug: "kids", name: "طلای بچه‌گانه", image: "/images/categories/kids.jpg" },
  { slug: "parsian", name: "شمش پارسیان", image: "/images/categories/goldbar.jpg" }
];

// نمونه محصولات برای پیش‌نمایش بخش‌ها
export const products: Product[] = [
  {
    id: "p-1",
    name: "گردنبند رگ مرزی",
    price: 18400000,
    image: "/images/products/necklace-1.jpg",
    category: "zananeh",
    tags: ["جدید"]
  },
  {
    id: "p-2",
    name: "گوشواره میخی پرتو",
    price: 9200000,
    image: "/images/products/earring-1.jpg",
    category: "zananeh"
  },
  {
    id: "p-3",
    name: "دستبند زنجیر هارمونی",
    price: 11650000,
    image: "/images/products/bracelet-1.jpg",
    category: "zananeh"
  },
  {
    id: "p-4",
    name: "انگشتر الماس خطی",
    price: 13700000,
    image: "/images/products/ring-1.jpg",
    category: "zananeh"
  },
  {
    id: "p-5",
    name: "ساعت و دستبند مردانه آذرخش",
    price: 22900000,
    image: "/images/products/men-1.jpg",
    category: "mardaneh"
  },
  {
    id: "p-6",
    name: "زنجیر کارتیر پهن",
    price: 18500000,
    image: "/images/products/men-2.jpg",
    category: "mardaneh",
    tags: ["پرفروش"]
  },
  {
    id: "p-7",
    name: "شمش پارسیان ۱۰ گرمی",
    price: 15280000,
    image: "/images/products/bar-1.jpg",
    category: "parsian",
    tags: ["سرمایه‌گذاری"]
  },
  {
    id: "p-8",
    name: "شمش پارسیان ۲۰ گرمی",
    price: 30460000,
    image: "/images/products/bar-2.jpg",
    category: "parsian"
  },
  {
    id: "p-9",
    name: "پک هدایای تولد دخترانه",
    price: 7800000,
    image: "/images/products/kids-1.jpg",
    category: "kids"
  },
  {
    id: "p-10",
    name: "دستبند ظریف کودک تاج",
    price: 5200000,
    image: "/images/products/kids-2.jpg",
    category: "kids"
  },
  {
    id: "p-11",
    name: "گردنبند صلیبی استار",
    price: 12800000,
    image: "/images/products/men-3.jpg",
    category: "mardaneh"
  },
  {
    id: "p-12",
    name: "پک نامزدی الماسه",
    price: 45800000,
    image: "/images/products/necklace-2.jpg",
    category: "zananeh",
    tags: ["ویژه"]
  }
];

export const featuredCategorySlugs = ["zananeh", "mardaneh", "parsian", "kids"];
