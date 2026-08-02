-- Platform expansion migration
-- Extends UserRole, adds account types, and creates platform tables

-- Extend UserRole enum
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'SUPER_ADMIN';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'MANAGER';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'SALES';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'CUSTOMER_SERVICE';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'PROJECT_MANAGER';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'DESIGNER';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'DEVELOPER';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'MARKETING';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'PRINT_PRODUCTION';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'ACCOUNTING';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'COMPANY_ADMIN';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'COMPANY_MEMBER';

-- Create AccountType enum
CREATE TYPE "AccountType" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- Extend users table
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "accountType" "AccountType" NOT NULL DEFAULT 'INDIVIDUAL';
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "companyId" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "department" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "jobTitle" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "notificationEmail" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "notificationSms" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "taxId" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "purchaseOrder" TEXT;

CREATE INDEX IF NOT EXISTS "users_companyId_idx" ON "users"("companyId");
CREATE INDEX IF NOT EXISTS "users_accountType_idx" ON "users"("accountType");

-- Additional enums
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ON_HOLD', 'AWAITING_APPROVAL', 'REVISION_REQUESTED', 'COMPLETED', 'CANCELED');
CREATE TYPE "QuoteStatus" AS ENUM ('DRAFT', 'SENT', 'VIEWED', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'CONVERTED');
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'SENT', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELED', 'REFUNDED');
CREATE TYPE "PrintOrderStatus" AS ENUM ('DRAFT', 'QUOTE_REQUESTED', 'AWAITING_FILES', 'ARTWORK_REVIEW', 'PROOF_READY', 'AWAITING_APPROVAL', 'APPROVED', 'IN_PRODUCTION', 'QUALITY_CHECK', 'READY_FOR_PICKUP', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "FileCategory" AS ENUM ('REQUIREMENT', 'BRAND_ASSET', 'DESIGN', 'PRINT_READY', 'PROOF', 'CONTRACT', 'INVOICE', 'DELIVERABLE', 'OTHER');
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST');
CREATE TYPE "SupportTicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'WAITING_CUSTOMER', 'RESOLVED', 'CLOSED');

-- Companies
CREATE TABLE IF NOT EXISTS "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "industry" TEXT,
    "website" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "taxId" TEXT,
    "billingAddress" TEXT,
    "shippingAddress" TEXT,
    "ownerId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "companies_slug_key" ON "companies"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "companies_ownerId_key" ON "companies"("ownerId");

-- Projects, quotes, invoices, files, messages, support, print, leads, CMS tables
-- (Full DDL generated from Prisma schema — run `npx prisma migrate dev` for complete sync)
