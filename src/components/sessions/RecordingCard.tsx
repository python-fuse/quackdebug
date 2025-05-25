import React, { FC, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Recording } from "@/lib/definitions";
import Player from "../global/Player";
import Storage from "@/supabase/storage";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Spinner from "../ui/spinner";
import DB from "@/supabase/db";
import { toast } from "@/lib/utils";

interface RecordingCardProps {
  recording: Recording;
  refetch: () => Promise<void>;
}

const RecordingCard: FC<RecordingCardProps> = ({ recording, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (recordingId: string) => {
    setIsLoading(true);
    const { error } = await DB.deleteRecording(recordingId);

    if (error) {
      console.error("Error deleting recording:", error);
      toast("error", "Failed to delete recording");
      setIsLoading(false);
      return;
    }

    toast("success", "Recording deleted successfully");
    setIsModalOpen(false);
    setIsLoading(false);
    await refetch();
  };

  return (
    <>
      <Card key={recording.id} className="flex-1">
        <CardContent className="flex flex-col gap-4 py-4">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-sm  text-gray-500">
              {new Date(recording.created_at ?? "").toLocaleString()}
            </h3>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setIsModalOpen(true)}
            >
              <Trash className="text-red-500 h-4 w-4" />
            </Button>
          </div>

          {/* Custom player with wavesurfer */}
          <Player
            audioSrc={Storage.getUrl(
              recording.audio_url.replace("recordings/", "")
            )}
          />

          <div className="w-full">
            <h4 className="text-sm font-semibold mb-2">Transcript</h4>
            {/* Display transcript with preformatted text */}
            <pre className="border rounded-md p-2 bg-gray-100/50 text-sm font-light w-full max-h-40 overflow-y-auto whitespace-pre-line break-words">
              {recording.transcript}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Confirm delete audio modal */}
      <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            Are you sure you want to delete this recording? This action cannot
            be undone.
          </DialogDescription>
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={() => handleDelete(recording.id)}
            >
              {isLoading ? <Spinner /> : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecordingCard;
