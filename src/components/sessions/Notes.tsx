import { Note } from "@/lib/definitions";
import { no } from "zod/v4/locales";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Notebook } from "lucide-react";

interface NotesProps {
  notes: Note[];
  sessionId: string;
}

const Notes = ({ notes }: NotesProps) => {
  return (
    <div className="w-1/2 p-4 md:border-r">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Notes</h2>

        <Button className="" variant={"outline"}>
          <Notebook /> Add Note
        </Button>
      </div>
      {/* <p className="text-gray-500 text-sm">Click on a note to view details</p> */}

      <div className="">
        {notes.length === 0 && (
          <div className=" text-gray-500">
            No notes available for this session.
          </div>
        )}

        {notes.map((note) => (
          <Card>
            <CardContent>
              <CardDescription>
                {new Date(note.created_at ?? "").toLocaleDateString()}
              </CardDescription>

              <p
                className="
              text-sm text-gray-700
              "
              >
                {note.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;
