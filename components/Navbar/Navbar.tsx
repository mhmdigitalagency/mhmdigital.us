import NavNormal from "./NavNormal";
import NavMobile from "./NavMobile";
import ContactButton from "./componentsNav/ContactButton";
import UserOrSignIn from "./componentsNav/UserOrSignIn";
import CartIcon from "./CartIcon";
import { Logo } from "@/components/brand/Logo";

const Navbar = async () => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-4 xl:px-14 py-4 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <Logo size="md" />
        <NavNormal />
        <div className="flex items-center gap-2 sm:gap-3">
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
