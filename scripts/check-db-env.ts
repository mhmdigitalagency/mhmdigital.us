import { getDatabaseUrl } from "../lib/env";

try {
  const url = getDatabaseUrl();
  // Mask password in log
  const safe = url.replace(/:([^:@/]+)@/, ":***@");
  console.log(`✓ Database URL configured (${safe})`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
