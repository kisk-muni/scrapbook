import { drizzle } from "drizzle-orm/postgres-js";
import * as Schema from "db/schema";
import postgres from "postgres";

if (!process.env.DB_URL) {
  throw new Error("DB_URL is required");
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const queryClient = postgres(process.env.DB_URL, { prepare: false, max: 200 });

export const db = drizzle(queryClient, {
  schema: {
    ...Schema,
  },
});
