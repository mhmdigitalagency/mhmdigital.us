import { Lock, Settings, User as Use, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignOutButton from "../AuthPages/Sign-out-button";

interface UserButtonProps {
  user: {
    name?: string | null;
    email?: string | null;
    role: "USER" | "ADMIN";
  };
}

export default function UserButton({ user }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="flex items-center justify-center aspect-square w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-400 text-white cursor-pointer"
          />
        }
      >
        <span className="uppercase text-sm md:text-base font-semibold font-sans">
          {user.name?.slice(0, 1) ?? "U"}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
  <DropdownMenuGroup>
    <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
  </DropdownMenuGroup>

  <DropdownMenuSeparator />

  <DropdownMenuGroup>
    {user.role === "ADMIN" && (
      <DropdownMenuItem render={<Link href="/admin" className="cursor-pointer" />}>
        <Lock className="mr-2 h-4 w-4" />
        <span>Admin</span>
      </DropdownMenuItem>
    )}

    <DropdownMenuItem render={<Link href="/profile" className="cursor-pointer" />}>
      <Use className="mr-2 h-4 w-4" />
      <span>Profile</span>
    </DropdownMenuItem>

    <DropdownMenuItem render={<Link href="/orders" className="cursor-pointer" />}>
      <LayoutDashboard className="mr-2 h-4 w-4" />
      <span>Orders</span>
    </DropdownMenuItem>
  </DropdownMenuGroup>

  <DropdownMenuSeparator />

  <DropdownMenuItem
    render={<SignOutButton />}
  >
  </DropdownMenuItem>
</DropdownMenuContent>
    </DropdownMenu>
  );
}