import { BillingCycle, Carts, CartItem } from "@/types/carts";
import { applyBrandingPromo } from "@/lib/promotions";

const CART_KEY = "cart";

export function getCart(): Carts {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : { items: [] };
  } catch {
    return { items: [] };
  }
}

export function saveCart(cart: Carts): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getUnitPrice(item: CartItem): number {
  let base = 0;

  switch (item.packageDuration) {
    case "MONTHLY":
      base = item.package.priceByMonth ?? 0;
      break;
    case "YEARLY":
      base = item.package.priceByYear ?? 0;
      break;
    case "ONE_TIME":
    default:
      base = item.package.price ?? 0;
  }

  return applyBrandingPromo(base, item.package.slug, {
    serviceName: item.package.service?.name,
    packageName: item.package.name,
  }).finalPrice;
}

export function getUnitPriceBreakdown(item: CartItem) {
  let base = 0;

  switch (item.packageDuration) {
    case "MONTHLY":
      base = item.package.priceByMonth ?? 0;
      break;
    case "YEARLY":
      base = item.package.priceByYear ?? 0;
      break;
    case "ONE_TIME":
    default:
      base = item.package.price ?? 0;
  }

  return applyBrandingPromo(base, item.package.slug, {
    serviceName: item.package.service?.name,
    packageName: item.package.name,
  });
}

export function addItemToCart(item: CartItem): Carts {
  const cart = getCart();

  const existingItemIndex = cart.items.findIndex(
    (i) =>
      i.packageId === item.packageId &&
      i.packageDuration === item.packageDuration
  );

  if (existingItemIndex !== -1) {
    cart.items[existingItemIndex].quantity += item.quantity;
  } else {
    cart.items.push(item);
  }

  saveCart(cart);
  return cart;
}

export function removeItemFromCart(
  packageId: string,
  packageDuration?: BillingCycle
): Carts {
  const cart = getCart();

  cart.items = cart.items.filter((item) => {
    if (packageDuration !== undefined) {
      return !(
        item.packageId === packageId &&
        item.packageDuration === packageDuration
      );
    }

    return item.packageId !== packageId;
  });

  saveCart(cart);
  return cart;
}

export function updateCartItemQuantity(
  packageId: string,
  quantity: number,
  packageDuration?: BillingCycle
): Carts {
  const cart = getCart();

  cart.items = cart.items
    .map((item) => {
      const sameItem =
        item.packageId === packageId &&
        (packageDuration === undefined ||
          item.packageDuration === packageDuration);

      if (!sameItem) return item;

      return {
        ...item,
        quantity,
      };
    })
    .filter((item) => item.quantity > 0);

  saveCart(cart);
  return cart;
}

export function clearCartStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_KEY);
}

export function getCartCount(cart: Carts): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(cart: Carts): number {
  return cart.items.reduce((sum, item) => {
    const unitPrice = getUnitPrice(item);
    return sum + unitPrice * item.quantity;
  }, 0);
}