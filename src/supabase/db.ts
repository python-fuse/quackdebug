import {
  RecordingInsert,
  SessionInsert,
  SessionUpdate,
  NoteInsert,
  NoteUpdate,
  RecordingUpdate,
  TagInsert,
  TagUpdate,
} from "@/lib/definitions";
import { supabase } from "./index";

class DB {
  // Debug Sessions
  static async createSession(data: SessionInsert) {
    return await supabase.from("debug_sessions").insert(data).select().single();
  }

  static async getSession(id: string) {
    return await supabase
      .from("debug_sessions")
      .select("*")
      .eq("id", id)
      .single();
  }

  static async getSessions(userId: string) {
    return await supabase
      .from("debug_sessions")
      .select("*")
      .eq("owner_id", userId)
      .order("created_at", { ascending: false });
  }

  static async updateSession(id: string, data: SessionUpdate) {
    return await supabase
      .from("debug_sessions")
      .update(data)
      .eq("id", id)
      .select()
      .single();
  }

  static async deleteSession(id: string) {
    return await supabase.from("debug_sessions").delete().eq("id", id);
  }

  //Recordings
  static async getRecordings(sessionId: string) {
    return await supabase
      .from("recordings")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false });
  }

  static async getRecording(id: string) {
    return await supabase.from("recordings").select("*").eq("id", id).single();
  }

  static async createRecording(data: RecordingInsert) {
    return await supabase.from("recordings").insert(data).select().single();
  }

  static async updateRecording(id: string, data: RecordingUpdate) {
    return await supabase
      .from("recordings")
      .update(data)
      .eq("id", id)
      .select()
      .single();
  }

  static async deleteRecording(id: string) {
    return await supabase.from("recordings").delete().eq("id", id);
  }

  // Notes
  static async getNotes(sessionId: string) {
    return await supabase
      .from("notes")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false });
  }

  static async getNote(id: string) {
    return await supabase.from("notes").select("*").eq("id", id).single();
  }

  static async createNote(data: NoteInsert) {
    return await supabase.from("notes").insert(data).select().single();
  }

  static async updateNote(id: string, data: NoteUpdate) {
    return await supabase
      .from("notes")
      .update(data)
      .eq("id", id)
      .select()
      .single();
  }

  static async deleteNote(id: string) {
    return await supabase.from("notes").delete().eq("id", id);
  }

  // Tags

  static async getTags() {
    return await supabase
      .from("tags")
      .select("*")
      .order("created_at", { ascending: false });
  }

  static async getTag(id: string) {
    return await supabase.from("tags").select("*").eq("id", id).single();
  }

  static async createTag(data: TagInsert) {
    return await supabase.from("tags").insert(data).select().single();
  }

  static async updateTag(id: string, data: TagUpdate) {
    return await supabase
      .from("tags")
      .update(data)
      .eq("id", id)
      .select()
      .single();
  }

  static async deleteTag(id: string) {
    return await supabase.from("tags").delete().eq("id", id);
  }

  // Dashboard Statistics
  static async getSessionsCount(userId: string) {
    const { count, error } = await supabase
      .from("debug_sessions")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", userId);

    return { count, error };
  }

  static async getRecentSessionsCount(userId: string, days: number = 7) {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    const { count, error } = await supabase
      .from("debug_sessions")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", userId)
      .gte("created_at", dateThreshold.toISOString());

    return { count, error };
  }

  static async getNotesCount(userId: string) {
    const { count, error } = await supabase
      .from("notes")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", userId);

    return { count, error };
  }

  static async getRecordingsCount(userId: string) {
    const { count, error } = await supabase
      .from("recordings")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", userId);

    return { count, error };
  }

  static async getSessionsGrowthRate(userId: string) {
    // Get count from current month
    const currentDate = new Date();
    const firstDayCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const { count: currentCount, error: currentError } = await supabase
      .from("debug_sessions")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", userId)
      .gte("created_at", firstDayCurrentMonth.toISOString());

    // Get count from previous month
    const firstDayPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastDayPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    const { count: previousCount, error: previousError } = await supabase
      .from("debug_sessions")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", userId)
      .gte("created_at", firstDayPreviousMonth.toISOString())
      .lte("created_at", lastDayPreviousMonth.toISOString());

    // Calculate growth rate
    if (previousCount === 0) {
      return {
        rate: currentCount && currentCount > 0 ? 100 : 0,
        isPositive: true,
      };
    }

    const growthRate = Math.round(
      (((currentCount ?? 0) - (previousCount ?? 0)) / (previousCount ?? 1)) *
        100
    );

    return {
      rate: Math.abs(growthRate),
      isPositive: growthRate >= 0,
      error: currentError || previousError,
    };
  }

  static async getRecordingsGrowthRate(userId: string) {
    // Get count from current month
    const currentDate = new Date();
    const firstDayCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const { count: currentCount, error: currentError } = await supabase
      .from("recordings")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", userId)
      .gte("created_at", firstDayCurrentMonth.toISOString());

    // Get count from previous month
    const firstDayPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastDayPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    const { count: previousCount, error: previousError } = await supabase
      .from("recordings")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", userId)
      .gte("created_at", firstDayPreviousMonth.toISOString())
      .lte("created_at", lastDayPreviousMonth.toISOString());

    // Calculate growth rate
    if (previousCount === 0) {
      return {
        rate: currentCount && currentCount > 0 ? 100 : 0,
        isPositive: true,
      };
    }

    const growthRate = Math.round(
      (((currentCount ?? 0) - (previousCount ?? 0)) / (previousCount ?? 1)) *
        100
    );

    return {
      rate: Math.abs(growthRate),
      isPositive: growthRate >= 0,
      error: currentError || previousError,
    };
  }
}

export default DB;
