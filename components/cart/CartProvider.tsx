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

const CART_STORAGE_KEY = "tivana_cart_v1";
const MAX_QUANTITY = 20;

type CartLine = {
  productId: string;
  quantity: number;
};

type CartItem = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

type CartContextValue = {
  isReady: boolean;
  rawLines: CartLine[];
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setItemQuantity: (productId: string, quantity: number) => void;
  getItemQuantity: (productId: string) => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const toValidCartLine = (input: unknown): CartLine | null => {
  if (!input || typeof input !== "object") {
    return null;
  }

  const candidate = input as { productId?: unknown; quantity?: unknown };
  if (typeof candidate.productId !== "string") {
    return null;
  }
  if (typeof candidate.quantity !== "number" || !Number.isFinite(candidate.quantity)) {
    return null;
  }

  const quantity = Math.max(1, Math.min(MAX_QUANTITY, Math.round(candidate.quantity)));
  return {
    productId: candidate.productId,
    quantity,
  };
};

const readStoredCart = (): CartLine[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((line) => toValidCartLine(line))
      .filter((line): line is CartLine => line !== null);
  } catch {
    return [];
  }
};

export default function CartProvider({ children }: { children: ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setRawLines(readStoredCart());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(rawLines));
  }, [isReady, rawLines]);

  const setItemQuantity = (productId: string, quantity: number) => {
    setRawLines((previous) => {
      const existing = previous.find((line) => line.productId === productId);
      if (!existing && quantity <= 0) {
        return previous;
      }

      const normalized = Math.max(0, Math.min(MAX_QUANTITY, Math.round(quantity)));
      if (normalized <= 0) {
        return previous.filter((line) => line.productId !== productId);
      }

      if (existing) {
        return previous.map((line) =>
          line.productId === productId ? { ...line, quantity: normalized } : line
        );
      }

      return [...previous, { productId, quantity: normalized }];
    });
  };

  const addItem = (productId: string, quantity = 1) => {
    const amount = Math.max(1, Math.round(quantity));
    setRawLines((previous) => {
      const existing = previous.find((line) => line.productId === productId);
      if (existing) {
        return previous.map((line) =>
          line.productId === productId
            ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + amount) }
            : line
        );
      }
      return [...previous, { productId, quantity: Math.min(MAX_QUANTITY, amount) }];
    });
  };

  const removeItem = (productId: string) => {
    setRawLines((previous) => previous.filter((line) => line.productId !== productId));
  };

  const clearCart = () => {
    setRawLines([]);
  };

  const getItemQuantity = (productId: string) =>
    rawLines.find((line) => line.productId === productId)?.quantity ?? 0;

  const items = useMemo(() => {
    return rawLines
      .map((line) => {
        const product = products.find((item) => item.id === line.productId);
        if (!product) {
          return null;
        }
        return {
          product,
          quantity: line.quantity,
          lineTotal: product.price * line.quantity,
        };
      })
      .filter((line): line is CartItem => line !== null);
  }, [rawLines]);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.lineTotal, 0),
    [items]
  );

  const value: CartContextValue = {
    isReady,
    rawLines,
    items,
    totalItems,
    subtotal,
    addItem,
    removeItem,
    setItemQuantity,
    getItemQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }
  return context;
};
