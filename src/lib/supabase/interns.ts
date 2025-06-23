// lib/supabase/interns.ts
import { supabase } from "../supabaseClient";
import { User } from "@/types/User";

/** read */
export const fetchInterns = async (): Promise<User[]> => {
  const { data, error } = await supabase.from("interns").select("*").order("id");
  if (error) {
    console.error("Fetch interns error:", error);
    return [];
  }
  return data ?? [];
};

/** insert */
export const insertIntern = async (
  intern: Omit<User, "id">
): Promise<void> => {
  const { error } = await supabase.from("interns").insert([intern]);
  if (error) console.error("Insert intern error:", error);
};

/** delete */
export const deleteInternById = async (id: number): Promise<void> => {
  const { error } = await supabase.from("interns").delete().eq("id", id);
  if (error) console.error("Delete intern error:", error);
};
