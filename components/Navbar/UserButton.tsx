import { Lock, Settings, User as UserIcon, LayoutDashboard, LogOut, Building2 } from "lucide-react";
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
import { isStaffRole, isCompanyRole } from "@/lib/rbac";

interface UserButtonProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export default function UserButton({ user }: UserButtonProps) {
  const role = user.role ?? "USER";
  const isStaff = isStaffRole(role);
  const isCompany = isCompanyRole(role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Account menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white cursor-pointer"
          />
        }
      >
        <span className="uppercase text-sm md:text-base font-semibold">
          {user.name?.slice(0, 1) ?? "U"}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {isStaff && (
            <DropdownMenuItem render={<Link href="/admin" className="cursor-pointer" />}>
              <Lock className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem render={<Link href="/dashboard" className="cursor-pointer" />}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>

          {isCompany && (
            <DropdownMenuItem render={<Link href="/dashboard/company" className="cursor-pointer" />}>
              <Building2 className="mr-2 h-4 w-4" />
              <span>Company</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem render={<Link href="/profile" className="cursor-pointer" />}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile & Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href="/orders" className="cursor-pointer" />}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem render={<SignOutButton />} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
