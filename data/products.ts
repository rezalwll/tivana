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

export const categories: Category[] = [
  { slug: "earring", name: "گوشواره", image: "/images/earring1.png" },
  { slug: "necklace", name: "گردنبند", image: "/images/necklace1.png" },
  { slug: "bracelet", name: "دستبند", image: "/images/bracelet1.png" },
  { slug: "ring", name: "انگشتر", image: "/images/ring1.png" },
  { slug: "parsian", name: "شمش پارسیان", image: "/images/storyoftivana3.png" },
];

const designTitles = [
  "آرتمیس",
  "مهتاب",
  "آرزو",
  "ساحل",
  "آبان",
  "صبا",
  "باران",
  "هلیا",
  "الیزه",
  "پارلا",
];

const categoryImagePool: Record<string, string[]> = {
  earring: ["/images/earring1.png", "/images/storyoftivana3.png", "/images/storyoftivana.png"],
  necklace: ["/images/necklace1.png", "/images/storyoftivana3.png", "/images/main-section-bg.png"],
  bracelet: ["/images/bracelet1.png", "/images/storyoftivana.png", "/images/storyoftivana3.png"],
  ring: ["/images/ring1.png", "/images/storyoftivana3.png", "/images/storyoftivana.png"],
  parsian: ["/images/storyoftivana3.png", "/images/storyoftivana.png", "/images/main-section-bg.png"],
};

const pricingConfig: Record<
  string,
  {
    basePrice: number;
    step: number;
  }
> = {
  earring: { basePrice: 8_300_000, step: 390_000 },
  necklace: { basePrice: 10_900_000, step: 460_000 },
  bracelet: { basePrice: 9_200_000, step: 420_000 },
  ring: { basePrice: 11_600_000, step: 500_000 },
  parsian: { basePrice: 15_000_000, step: 1_250_000 },
};

const categoryLabel = (slug: string) =>
  categories.find((category) => category.slug === slug)?.name ?? slug;

const buildCategoryProducts = (slug: string): Product[] => {
  const images = categoryImagePool[slug] ?? ["/images/storyoftivana.png"];
  const pricing = pricingConfig[slug] ?? { basePrice: 10_000_000, step: 350_000 };
  const label = categoryLabel(slug);

  return Array.from({ length: 10 }, (_, index) => ({
    id: `${slug}-${index + 1}`,
    name: `${label} مدل ${designTitles[index]}`,
    price: pricing.basePrice + index * pricing.step,
    image: images[index % images.length],
    category: slug,
    tags:
      index === 0
        ? ["جدید"]
        : index === 1
          ? ["پرفروش"]
          : index === 2
            ? ["پیشنهادی"]
            : undefined,
  }));
};

export const products: Product[] = categories.flatMap((category) =>
  buildCategoryProducts(category.slug)
);

export const featuredCategorySlugs = ["earring", "necklace", "bracelet", "ring"];
