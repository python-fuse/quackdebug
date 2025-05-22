import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

const supaBaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supaBaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient<Database>(supaBaseURL, supaBaseAnonKey);
