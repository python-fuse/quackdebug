import { Recording } from "@/lib/definitions";
import { Button } from "../ui/button";
import { Speech } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useRef, useState } from "react";
import Image from "next/image";

interface RecordingsProps {
  recordings: Recording[];
  sessionId: string;
}

const Recordings = ({ recordings }: RecordingsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recording, setRecording] = useState<Recording | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);

  // Recorder setup
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorder?.stop();
      setIsRecording(false);
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setStream(stream);
    const recorder = new MediaRecorder(stream);
    // audioChunksRef.current = [];

    recorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
      setAudioChunks((prev) => [...prev, event.data]);
    };

    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);

      // transcribe
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const cancelRecording = () => {
    setAudioUrl("");
    setTranscript(null);
    setAudioChunks([]);
    setIsModalOpen(false);
    setIsRecording(false);

    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    audioChunksRef.current = [];
  };

  return (
    <>
      {/* Main recordings tab */}
      <div className="w-1/2 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Recordings</h2>

          <Button
            className=""
            variant={"outline"}
            onClick={() => setIsModalOpen(true)}
          >
            <Speech /> New Recording
          </Button>
        </div>
        <div className="mt-4">
          {recordings.length === 0 && (
            <div className=" text-gray-500">
              No recordings available for this session.
            </div>
          )}

          {recordings.map((recording) => (
            <div key={recording.id} className="p-4 border-b border-gray-300">
              <h3 className="text-lg font-semibold">{recording.id}</h3>
              <p>{recording.transcript}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New recording modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              New Recording
            </DialogTitle>
            <DialogDescription>
              Click the duck to start recording. Use the controls to pause, save
              or cancel.
            </DialogDescription>
          </DialogHeader>

          {/* Recorder Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-6 mt-4">
            {/* Duck Icon Button */}
            <button
              className={`rounded-full border-2 border-blue-500 p-2 hover:bg-blue-100 transition`}
              onClick={toggleRecording}
            >
              <Image
                src="/logo.png"
                alt="Duck"
                width={100}
                height={100}
                className={`${isRecording ? "animate-pulse" : ""}`}
              />
            </button>

            {/* Audio Controls and Actions */}
            <div className="flex flex-col items-start mt-4 sm:mt-0 sm:items-start gap-3 w-full">
              {audioUrl && (
                <audio
                  src={audioUrl}
                  controls
                  className="w-full max-w-xs bg-gray-100 rounded-md shadow"
                />
              )}

              <div className="flex gap-2">
                <Button
                  variant="default"
                  disabled={audioUrl === ""}
                  onClick={() => {
                    /* save logic here */
                  }}
                >
                  Save Recording
                </Button>

                <Button variant="destructive" onClick={cancelRecording}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>

          {/* Transcription Preview */}
          <div className="mt-6 w-full">
            <h3 className="text-lg font-medium mb-2">Transcription Preview</h3>
            {isTranscribing ? (
              <p className="text-gray-500">Transcribing...</p>
            ) : (
              <textarea
                className="w-full min-h-[100px] p-2 border rounded-md resize-none"
                placeholder="No transcription available yet."
                value={transcript || ""}
                onChange={(e) => setTranscript(e.target.value)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Recordings;
