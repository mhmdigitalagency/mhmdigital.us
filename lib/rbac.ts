import { UserRole } from "@/app/generated/prisma/enums";

/** Staff roles that access the admin workspace */
export const STAFF_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN,
  UserRole.MANAGER,
  UserRole.SALES,
  UserRole.CUSTOMER_SERVICE,
  UserRole.PROJECT_MANAGER,
  UserRole.DESIGNER,
  UserRole.DEVELOPER,
  UserRole.MARKETING,
  UserRole.PRINT_PRODUCTION,
  UserRole.ACCOUNTING,
];

/** Roles with full admin privileges */
export const ADMIN_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN,
];

export const COMPANY_ROLES: UserRole[] = [
  UserRole.COMPANY_ADMIN,
  UserRole.COMPANY_MEMBER,
];

export function isStaffRole(role: UserRole | string | undefined | null): boolean {
  return !!role && STAFF_ROLES.includes(role as UserRole);
}

export function isAdminRole(role: UserRole | string | undefined | null): boolean {
  return !!role && ADMIN_ROLES.includes(role as UserRole);
}

export function isCompanyRole(role: UserRole | string | undefined | null): boolean {
  return !!role && COMPANY_ROLES.includes(role as UserRole);
}

export function getPostLoginRedirect(role: UserRole | string | undefined | null): string {
  if (isStaffRole(role)) return "/admin";
  if (role === UserRole.COMPANY_ADMIN || role === UserRole.COMPANY_MEMBER) {
    return "/dashboard/company";
  }
  return "/dashboard";
}

export function canAccessAdmin(role: UserRole | string | undefined | null): boolean {
  return isStaffRole(role);
}

export function canAccessCustomerDashboard(role: UserRole | string | undefined | null): boolean {
  if (!role) return false;
  return (
    role === UserRole.USER ||
    role === UserRole.COMPANY_ADMIN ||
    role === UserRole.COMPANY_MEMBER
  );
}
