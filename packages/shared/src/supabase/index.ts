import { createClient } from "@supabase/supabase-js";
import { Database } from "./schema";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_API_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
