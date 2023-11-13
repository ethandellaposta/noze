import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

type Pin = Database["public"]["Tables"]["Pins"]["Row"];

export class Api {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    console.log({ supabase })
    this.supabase = supabase;
  }

  //singleton pattern
  private static instance: Api;
  static getInstance(supabase: SupabaseClient): Api {
    console.log({ supabase })
    if (!Api.instance) {
      this.instance = new Api(supabase);
    }
    return Api.instance;
  }

  async findPins(query: Partial<Pin>): Promise<Pin[]> {
    console.log({ supabase: this.supabase })
    const { data, error } = await this.supabase
      .from('pins')
      .select('*')
      .match(query);
    if (error) throw error;
    return data;
  }
};
