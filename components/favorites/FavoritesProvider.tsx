"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

const FAVORITES_STORAGE_KEY = "tivana_favorites_v1";
const validProductIds = new Set(products.map((product) => product.id));

type FavoritesContextValue = {
  isReady: boolean;
  favoriteIds: string[];
  items: Product[];
  totalFavorites: number;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const sanitizeFavoriteIds = (input: unknown): string[] => {
  if (!Array.isArray(input)) {
    return [];
  }

  const uniqueIds = new Set<string>();
  for (const value of input) {
    if (typeof value !== "string" || !validProductIds.has(value)) {
      continue;
    }
    uniqueIds.add(value);
  }

  return Array.from(uniqueIds);
};

const readStoredFavorites = (): string[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    return sanitizeFavoriteIds(JSON.parse(stored));
  } catch {
    return [];
  }
};

export default function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setFavoriteIds(readStoredFavorites());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds, isReady]);

  const addFavorite = (productId: string) => {
    if (!validProductIds.has(productId)) {
      return;
    }
    setFavoriteIds((previous) =>
      previous.includes(productId) ? previous : [...previous, productId]
    );
  };

  const removeFavorite = (productId: string) => {
    setFavoriteIds((previous) => previous.filter((id) => id !== productId));
  };

  const toggleFavorite = (productId: string) => {
    if (!validProductIds.has(productId)) {
      return;
    }
    setFavoriteIds((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );
  };

  const clearFavorites = () => {
    setFavoriteIds([]);
  };

  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const items = useMemo(() => {
    return favoriteIds
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product));
  }, [favoriteIds]);

  const value: FavoritesContextValue = {
    isReady,
    favoriteIds,
    items,
    totalFavorites: favoriteIds.length,
    isFavorite: (productId: string) => favoriteIdSet.has(productId),
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider.");
  }
  return context;
};

