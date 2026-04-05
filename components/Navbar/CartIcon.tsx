"use client";

import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";

const CartIcon = () => {
  const { cartCount, isLoaded } = useCart();

  return (
    <Link href="/cart" className="relative">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex flex-col justify-center items-center bg-white hover:bg-gray-200 transition-all duration-300 shadow-lg">
      <FaCartShopping className="size-4 md:size-6 text-red-500" />
      {isLoaded && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {cartCount}
        </span>
      )}
      </div>
    </Link>
  );
};

export default CartIcon;