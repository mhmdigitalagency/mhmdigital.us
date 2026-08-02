import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
import { UserRole } from "@/app/generated/prisma/enums";

const statements = {
  ...defaultStatements,
  projects: ["create", "read", "update", "delete", "assign"],
  quotes: ["create", "read", "update", "delete", "send"],
  invoices: ["create", "read", "update", "delete", "send"],
  printOrders: ["create", "read", "update", "delete", "manage"],
  content: ["create", "read", "update", "delete"],
  customers: ["create", "read", "update", "delete", "suspend"],
} as const;

export const ac = createAccessControl(statements);

const customerPermissions = {
  projects: ["read"],
  quotes: ["read"],
  invoices: ["read"],
  printOrders: ["create", "read"],
} as const;

const staffPermissions = {
  ...adminAc.statements,
  projects: ["create", "read", "update", "delete", "assign"],
  quotes: ["create", "read", "update", "delete", "send"],
  invoices: ["create", "read", "update", "delete", "send"],
  printOrders: ["create", "read", "update", "delete", "manage"],
  content: ["create", "read", "update", "delete"],
  customers: ["create", "read", "update", "delete", "suspend"],
} as const;

export const roles = {
  [UserRole.USER]: ac.newRole(customerPermissions),
  [UserRole.COMPANY_ADMIN]: ac.newRole({
    ...customerPermissions,
    projects: ["read", "update"],
    quotes: ["read", "update"],
  }),
  [UserRole.COMPANY_MEMBER]: ac.newRole(customerPermissions),
  [UserRole.SUPER_ADMIN]: ac.newRole(staffPermissions),
  [UserRole.ADMIN]: ac.newRole(staffPermissions),
  [UserRole.MANAGER]: ac.newRole(staffPermissions),
  [UserRole.SALES]: ac.newRole({
    projects: ["read"],
    quotes: ["create", "read", "update", "send"],
    invoices: ["read"],
    printOrders: ["read"],
    content: ["read"],
    customers: ["create", "read", "update"],
  }),
  [UserRole.CUSTOMER_SERVICE]: ac.newRole({
    projects: ["read", "update"],
    quotes: ["read"],
    invoices: ["read"],
    printOrders: ["read", "update"],
    content: ["read"],
    customers: ["read", "update"],
  }),
  [UserRole.PROJECT_MANAGER]: ac.newRole({
    projects: ["create", "read", "update", "assign"],
    quotes: ["read"],
    invoices: ["read"],
    printOrders: ["read"],
    content: ["read"],
    customers: ["read"],
  }),
  [UserRole.DESIGNER]: ac.newRole({
    projects: ["read", "update"],
    printOrders: ["read", "update"],
    content: ["read"],
  }),
  [UserRole.DEVELOPER]: ac.newRole({
    projects: ["read", "update"],
    content: ["read"],
  }),
  [UserRole.MARKETING]: ac.newRole({
    content: ["create", "read", "update", "delete"],
    customers: ["read"],
    quotes: ["read"],
  }),
  [UserRole.PRINT_PRODUCTION]: ac.newRole({
    printOrders: ["create", "read", "update", "manage"],
    projects: ["read"],
  }),
  [UserRole.ACCOUNTING]: ac.newRole({
    invoices: ["create", "read", "update", "send"],
    quotes: ["read"],
    customers: ["read"],
  }),
};
