import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  canAccessAdmin,
  canAccessCustomerDashboard,
  getPostLoginRedirect,
  isCompanyRole,
} from "@/lib/rbac";
import { UserRole } from "@/app/generated/prisma/enums";

export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) redirect("/connexion");
  return session;
}

export async function requireStaff() {
  const session = await requireSession();
  const role = session.user.role as UserRole;
  if (!canAccessAdmin(role)) redirect("/dashboard?error=access-denied");
  return session;
}

export async function requireAdmin() {
  const session = await requireSession();
  const role = session.user.role as UserRole;
  if (!canAccessAdmin(role)) redirect("/dashboard?error=access-denied");
  return session;
}

export async function requireCustomer() {
  const session = await requireSession();
  const role = session.user.role as UserRole;
  if (!canAccessCustomerDashboard(role)) {
    if (canAccessAdmin(role)) redirect("/admin");
    redirect("/connexion");
  }
  return session;
}

export async function requireCompanyUser() {
  const session = await requireCustomer();
  const role = session.user.role as UserRole;
  if (!isCompanyRole(role)) redirect("/dashboard");
  return session;
}

export function resolveLoginRedirect(
  role: UserRole | string | undefined | null,
  callbackURL?: string | null
): string {
  if (callbackURL && callbackURL.startsWith("/") && !callbackURL.startsWith("//")) {
    return callbackURL;
  }
  return getPostLoginRedirect(role);
}
