import { defineConfig } from "prisma/config";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

const url =
  process.env.POSTGRES_URL ??
  process.env.DATABASE_URL ??
  "postgresql://localhost:5432/mhm_digital";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url,
  },
});
