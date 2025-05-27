import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import { toast } from "@/lib/utils";
import Storage from "@/supabase/storage";
import DB from "@/supabase/db";
import { RecordingInsert } from "@/lib/definitions";
import Player from "../global/Player";

interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  onRecordingSaved: () => void;
}

const RecordingModal = ({
  isOpen,
  onClose,
  sessionId,
  onRecordingSaved,
}: RecordingModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    audioUrl,
    audioBlob,
    isRecording,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  const {
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    error: speechError,
  } = useSpeechRecognition();

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      stopListening();
      return;
    }

    await startRecording();
    startListening();
  };

  const cancelRecording = () => {
    resetRecording();
    resetTranscript();
    onClose();
  };

  const handleSaveRecording = async () => {
    if (!audioBlob) return;

    try {
      setIsLoading(true);

      const audioResponse = await Storage.uploadRecording(
        audioBlob,
        `${crypto.randomUUID()}.webm`,
        sessionId
      );

      if (!audioResponse) {
        throw new Error("Failed to upload audio");
      }

      const newRecording: RecordingInsert = {
        audio_url: audioResponse,
        session_id: sessionId,
        transcript,
      };

      await DB.createRecording(newRecording);

      toast("success", "Recording saved successfully");
      cancelRecording();
      onRecordingSaved();
    } catch (error) {
      console.log(error);
      toast("error", "Failed to save recording");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && cancelRecording()}>
      <DialogContent
        className="sm:max-w-[425px] md:min-w-1/2"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>New Recording</DialogTitle>
          <DialogDescription>
            Click the duck to start recording. Click again to stop.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col md:flex-row gap-4">
          {/* Record controller */}
          <div className="flex flex-col items-center">
            <button className="rounded-full p-4 bg-transparent border hover:bg-blue-600/30 transition duration-200">
              <Image
                src="/logo.png"
                alt="Duck"
                width={100}
                height={100}
                className={`${
                  isRecording ? "animate-pulse" : ""
                } cursor-pointer`}
                onClick={toggleRecording}
              />
            </button>

            <p className="mt-2 text-sm text-gray-500">
              {isRecording ? "Recording..." : "Click to start"}
            </p>

            {audioUrl && <Player audioSrc={audioUrl} />}
          </div>

          {/* Transcription preview */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Transcription</h3>
            {speechError ? (
              <div className="text-red-500">{speechError}</div>
            ) : (
              <div className="border rounded p-4 h-64 overflow-y-auto bg-gray-50">
                {transcript || (
                  <p className="text-gray-500">
                    {isRecording
                      ? "Speak now to see live transcription..."
                      : "No transcription available yet."}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 justify-end">
          <Button variant="destructive" onClick={cancelRecording}>
            Cancel
          </Button>

          <Button
            disabled={!transcript || isLoading || isRecording}
            onClick={handleSaveRecording}
          >
            {isLoading ? <Spinner /> : "Save Recording"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordingModal;
