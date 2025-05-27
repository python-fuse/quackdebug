/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { NoteInsert } from "@/lib/definitions";
import DB from "@/supabase/db";
import { toast } from "@/lib/utils";
import Spinner from "../ui/spinner";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  onNoteSaved: () => void;
  noteToEdit?: {
    id: string;
    content: string;
  };
}

const NoteModal = ({
  isOpen,
  onClose,
  sessionId,
  onNoteSaved,
  noteToEdit,
}: NoteModalProps) => {
  const [content, setContent] = useState(noteToEdit?.content || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveNote = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      if (noteToEdit) {
        // Update existing note
        const { error } = await DB.updateNote(noteToEdit.id, {
          content,
          updated_at: new Date().toISOString(),
        });

        if (error) throw error;
        toast("success", "Note updated successfully");
      } else {
        // Create new note
        const newNote: NoteInsert = {
          content,
          session_id: sessionId,
          created_at: new Date().toISOString(),
        };

        const { error } = await DB.createNote(newNote);
        if (error) throw error;
        toast("success", "Note created successfully");
      }

      onNoteSaved();
      onClose();
      setContent("");
    } catch (error: any) {
      console.error("Error saving note:", error);
      toast("error", error.message || "Failed to save note");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setContent(noteToEdit?.content || "");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{noteToEdit ? "Edit Note" : "New Note"}</DialogTitle>
          <DialogDescription>
            {noteToEdit
              ? "Update your note below"
              : "Add a new note to this debug session"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Enter your note here..."
            className="max-h-[200px] overflow-y-auto"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="destructive" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={!content.trim() || isLoading}
            onClick={handleSaveNote}
          >
            {isLoading ? <Spinner /> : noteToEdit ? "Update" : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteModal;
