import { hasDatabaseUrl } from "@/lib/env";

/** Runs a Prisma query when a database URL is configured; otherwise returns fallback. */
export async function withDatabase<T>(
  query: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (!hasDatabaseUrl()) {
    return fallback;
  }

  try {
    return await query();
  } catch {
    return fallback;
  }
}
