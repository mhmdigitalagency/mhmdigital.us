import NavNormal from "./NavNormal";
import NavMobile from "./NavMobile";
import ContactButton from "./componentsNav/ContactButton";
import UserOrSignIn from "./componentsNav/UserOrSignIn";
import CartIcon from "./CartIcon";
import { Logo } from "@/components/brand/Logo";

const Navbar = async () => {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo size="md" className="shrink-0" />

        <NavNormal />

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <UserOrSignIn />
          <ContactButton />
          <CartIcon />
          <NavMobile />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
