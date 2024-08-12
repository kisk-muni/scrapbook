import { drizzle } from "drizzle-orm/postgres-js";
import * as Schema from "db/schema";
import postgres from "postgres";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const queryClient = postgres({
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

if (!process.env.DB_URL) {
  throw new Error("DB_URL is required");
}

export const db = drizzle(queryClient, {
  schema: {
    ...Schema,
  },
});
