import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env.local" });

if (!process.env.DB_URL) {
  throw new Error("DB_URL is required");
}

export default {
  schema: "./schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
} satisfies Config;
