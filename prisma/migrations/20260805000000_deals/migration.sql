-- CreateTable
CREATE TABLE IF NOT EXISTS "deals" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "badgeText" TEXT,
    "discountLabel" TEXT,
    "imageUrl" TEXT,
    "buttonText" TEXT NOT NULL DEFAULT 'Claim Deal',
    "buttonUrl" TEXT NOT NULL DEFAULT '/quote',
    "category" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "showOnHome" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deals_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "deals_isActive_idx" ON "deals"("isActive");
CREATE INDEX IF NOT EXISTS "deals_showOnHome_idx" ON "deals"("showOnHome");
CREATE INDEX IF NOT EXISTS "deals_sortOrder_idx" ON "deals"("sortOrder");
