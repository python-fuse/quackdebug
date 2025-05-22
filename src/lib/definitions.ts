import { LucideIcon } from "lucide-react";
import { Database } from "../../database.types";

export interface SidebarLink {
  title: string;
  href: string;
  icon: LucideIcon;
}

// Session
export type DebugSession =
  Database["public"]["Tables"]["debug_sessions"]["Row"];
export type SessionInsert =
  Database["public"]["Tables"]["debug_sessions"]["Insert"];
export type SessionUpdate =
  Database["public"]["Tables"]["debug_sessions"]["Update"];

// Recordings
export type Recording = Database["public"]["Tables"]["recordings"]["Row"];
export type RecordingInsert =
  Database["public"]["Tables"]["recordings"]["Insert"];
export type RecordingUpdate =
  Database["public"]["Tables"]["recordings"]["Update"];

// Notes
export type Note = Database["public"]["Tables"]["notes"]["Row"];
export type NoteInsert = Database["public"]["Tables"]["notes"]["Insert"];
export type NoteUpdate = Database["public"]["Tables"]["notes"]["Update"];

// Tags
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type TagInsert = Database["public"]["Tables"]["tags"]["Insert"];
export type TagUpdate = Database["public"]["Tables"]["tags"]["Update"];

// Reactions
export type Reaction = Database["public"]["Tables"]["reactions"]["Row"];
export type ReactionInsert =
  Database["public"]["Tables"]["reactions"]["Insert"];
export type ReactionUpdate =
  Database["public"]["Tables"]["reactions"]["Update"];
