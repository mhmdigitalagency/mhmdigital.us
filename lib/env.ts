import { config } from "dotenv";
import { resolve } from "path";

// Load Next.js-style env files (local overrides first)
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

/**
 * Returns the PostgreSQL connection URL.
 * Supports POSTGRES_URL (primary) and DATABASE_URL (common on Vercel/Neon/Supabase).
 */
export function getDatabaseUrl(): string {
  const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;

  if (!url || url.trim() === "") {
    throw new Error(
      [
        "Missing database connection URL.",
        "",
        "Create a .env.local file in the project root with:",
        "",
        "  POSTGRES_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE",
        "",
        "Examples:",
        "  • Neon:     postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require",
        "  • Supabase: postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres",
        "  • Local:    postgresql://postgres:postgres@localhost:5432/mhm_digital",
        "",
        "See .env.example for all required variables.",
      ].join("\n")
    );
  }

  // Catch common placeholder values
  if (url.includes("@base") || url.includes("HOST") || url.includes("PASSWORD")) {
    throw new Error(
      `POSTGRES_URL appears to contain placeholder values. Please set a real connection string in .env.local.\nGot: ${url.replace(/:[^:@]+@/, ":***@")}`
    );
  }

  return url;
}

export function hasDatabaseUrl(): boolean {
  try {
    getDatabaseUrl();
    return true;
  } catch {
    return false;
  }
}
