"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addItemToCart,
  clearCartStorage,
  getCart,
  getCartCount,
  getCartTotal,
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/lib/cartUtils";
import { BillingCycle, CartItem, Carts } from "@/types/carts";

interface CartContextType {
  cart: Carts;
  cartCount: number;
  cartTotal: number;
  isLoaded: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (packageId: string, packageDuration?: BillingCycle) => void;
  increaseQuantity: (packageId: string, packageDuration?: BillingCycle) => void;
  decreaseQuantity: (packageId: string, packageDuration?: BillingCycle) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Carts>({ items: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedCart = getCart();
    setCart(storedCart);
    setIsLoaded(true);
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    const updatedCart = addItemToCart(item);
    setCart({ ...updatedCart });
  }, []);

  const removeFromCart = useCallback(
    (packageId: string, packageDuration?: BillingCycle) => {
      const updatedCart = removeItemFromCart(packageId, packageDuration);
      setCart({ ...updatedCart });
    },
    []
  );

  const increaseQuantity = useCallback(
    (packageId: string, packageDuration?: BillingCycle) => {
      setCart((currentCart) => {
        const target = currentCart.items.find(
          (item) =>
            item.packageId === packageId &&
            (packageDuration === undefined ||
              item.packageDuration === packageDuration)
        );

        if (!target) return currentCart;

        const updatedCart = updateCartItemQuantity(
          packageId,
          target.quantity + 1,
          packageDuration
        );

        return { ...updatedCart };
      });
    },
    []
  );

  const decreaseQuantity = useCallback(
    (packageId: string, packageDuration?: BillingCycle) => {
      setCart((currentCart) => {
        const target = currentCart.items.find(
          (item) =>
            item.packageId === packageId &&
            (packageDuration === undefined ||
              item.packageDuration === packageDuration)
        );

        if (!target) return currentCart;

        const updatedCart = updateCartItemQuantity(
          packageId,
          target.quantity - 1,
          packageDuration
        );

        return { ...updatedCart };
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    clearCartStorage();
    setCart({ items: [] });
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartCount: getCartCount(cart),
      cartTotal: getCartTotal(cart),
      isLoaded,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [
      cart,
      isLoaded,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};