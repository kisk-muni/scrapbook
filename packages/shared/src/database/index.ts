import { createClient } from "@supabase/supabase-js";
import type { Database } from "./schema-generated";
export type { Json } from "./schema-generated";
//export * from "./schema";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_API_URL as string,
  (process.env.SUPABASE_SERVICE_ROLE_KEY as string) ||
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)
);
