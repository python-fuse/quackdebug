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
import { useState } from "react";
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

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorder?.stop();
      setIsRecording(false);
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    recorder.ondataavailable = (event) => chunks.push(event.data);

    recorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: "audio/webm" });
      setAudioChunks([]);

      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);

      // transcribe
    };

    recorder.start();
    setMediaRecorder(recorder);
    setAudioChunks(chunks);
    setIsRecording(true);
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
        <DialogContent className="sm:max-w-[425px] md:min-w-1/2">
          <DialogHeader>
            <DialogTitle>New Recording</DialogTitle>
            <DialogDescription>
              Click the duck to start recording. Click again to stop.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex ">
            {/* Record controller */}
            <button className="rounded-full p-4 bg-transparent border  hover:bg-blue-600/30 transition duration-200">
              <Image
                src="/logo.png"
                alt="Duck"
                width={100}
                height={100}
                className={`${
                  isRecording ? "duck-recording" : ""
                } cursor-pointer`}
                onClick={toggleRecording}
              />
            </button>

            {audioUrl && <audio src={audioUrl} controls />}

            {/* Transcription preview */}
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Transcription Preview</h3>
              {isTranscribing ? (
                <p>Transcribing...</p>
              ) : transcript ? (
                <textarea>{transcript}</textarea>
              ) : (
                <p>No transcription available yet.</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Recordings;
