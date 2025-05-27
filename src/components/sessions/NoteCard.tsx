/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useState } from "react";
import { Note } from "@/lib/definitions";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import DB from "@/supabase/db";
import { toast } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Spinner from "../ui/spinner";

interface NoteCardProps {
  note: Note;
  refetch: () => void;
  onEdit: (note: { id: string; content: string }) => void;
}

const NoteCard: FC<NoteCardProps> = ({ note, refetch, onEdit }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await DB.deleteNote(note.id);
      if (error) {
        console.error("Error deleting note:", error);
        toast("error", "Failed to delete note");
        return;
      }

      toast("success", "Note deleted successfully");
      refetch();
    } catch (error: any) {
      console.error("Error deleting note:", error);
      toast("error", error.message || "Failed to delete note");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card key={note.id}>
        <CardContent>
          <div className="flex justify-between items-start">
            <CardDescription>
              {new Date(note.created_at ?? "").toLocaleDateString()}
              {note.updated_at && note.updated_at !== note.created_at && (
                <span className="ml-2 text-xs">(edited)</span>
              )}
            </CardDescription>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onEdit({ id: note.id, content: note.content })}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
            {note.content}
          </p>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this note? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button disabled={isDeleting}>Cancel</Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              variant={"destructive"}
            >
              {isDeleting ? <Spinner /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NoteCard;
