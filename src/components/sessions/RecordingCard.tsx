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
      <Card key={recording.id}>
        <CardContent className="flex justify-between gap-4">
          <div className="flex flex-col gap-y-4 flex-1">
            {/* <audio
                src={Storage.getUrl(
                    recording.audio_url.replace("recordings/", "")
                )}
                controls
            /> */}

            {/* New custom player with wavesurfer */}
            <Player
              audioSrc={Storage.getUrl(
                recording.audio_url.replace("recordings/", "")
              )}
            />

            <pre className="border rounded-md p-2 bg-gray-100/50 text-sm font-">
              {recording.transcript}
            </pre>
          </div>

          <Button variant={"outline"} onClick={() => setIsModalOpen(true)}>
            <Trash className="text-red-500" size={4} />
          </Button>
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
