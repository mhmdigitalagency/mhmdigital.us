import { describe, it, expect } from "vitest";
import {
  isStaffRole,
  isAdminRole,
  isCompanyRole,
  getPostLoginRedirect,
  canAccessAdmin,
} from "@/lib/rbac";
import { UserRole } from "@/app/generated/prisma/enums";

describe("RBAC", () => {
  it("identifies staff roles", () => {
    expect(isStaffRole(UserRole.ADMIN)).toBe(true);
    expect(isStaffRole(UserRole.SUPER_ADMIN)).toBe(true);
    expect(isStaffRole(UserRole.USER)).toBe(false);
    expect(isStaffRole(UserRole.COMPANY_ADMIN)).toBe(false);
  });

  it("identifies company roles", () => {
    expect(isCompanyRole(UserRole.COMPANY_ADMIN)).toBe(true);
    expect(isCompanyRole(UserRole.COMPANY_MEMBER)).toBe(true);
    expect(isCompanyRole(UserRole.USER)).toBe(false);
  });

  it("redirects users correctly after login", () => {
    expect(getPostLoginRedirect(UserRole.ADMIN)).toBe("/admin");
    expect(getPostLoginRedirect(UserRole.USER)).toBe("/dashboard");
    expect(getPostLoginRedirect(UserRole.COMPANY_ADMIN)).toBe("/dashboard/company");
  });

  it("restricts admin access", () => {
    expect(canAccessAdmin(UserRole.ADMIN)).toBe(true);
    expect(canAccessAdmin(UserRole.USER)).toBe(false);
  });
});

describe("Quote validation", () => {
  it("validates email format", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test("test@example.com")).toBe(true);
    expect(emailRegex.test("invalid")).toBe(false);
  });
});

describe("Login redirect paths", () => {
  it("uses safe callback URLs", () => {
    const safe = (cb: string) => cb.startsWith("/") && !cb.startsWith("//");
    expect(safe("/dashboard")).toBe(true);
    expect(safe("//evil.com")).toBe(false);
    expect(safe("https://evil.com")).toBe(false);
  });
});
