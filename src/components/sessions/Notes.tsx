import { useEffect, useState } from "react";
import { Note } from "@/lib/definitions";
import { Button } from "../ui/button";
import { Notebook } from "lucide-react";
import NoteCard from "./NoteCard";
import NoteModal from "./NoteModal";
import DB from "@/supabase/db";
import { toast } from "@/lib/utils";

interface NotesProps {
  notes: Note[];
  sessionId: string;
}

const Notes = ({ notes: initialNotes, sessionId }: NotesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [noteToEdit, setNoteToEdit] = useState<
    { id: string; content: string } | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);
  const handleNoteChange = async () => {
    setIsLoading(true);
    try {
      const res = await DB.getNotes(sessionId);
      if (res.error) {
        console.error("Error fetching notes:", res.error);
        toast("error", res.error.message);
      } else {
        setNotes(res.data);
      }
    } catch (error: any) {
      console.error("Error refreshing notes:", error);
      toast("error", error.message || "Failed to refresh notes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2 p-4 md:border-r">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Notes</h2>

        <Button
          className=""
          variant={"outline"}
          onClick={() => {
            setNoteToEdit(undefined);
            setIsModalOpen(true);
          }}
        >
          <Notebook /> Add Note
        </Button>
      </div>

      <div className="mt-4 flex flex-col space-y-4">
        {notes.length === 0 && (
          <div className="text-gray-500">
            No notes available for this session.
          </div>
        )}

        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            refetch={handleNoteChange}
            onEdit={(note) => {
              setNoteToEdit(note);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Note modal for adding/editing */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sessionId={sessionId}
        onNoteSaved={handleNoteChange}
        noteToEdit={noteToEdit}
      />
    </div>
  );
};

export default Notes;
