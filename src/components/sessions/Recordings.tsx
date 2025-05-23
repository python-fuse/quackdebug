import { Recording, RecordingInsert } from "@/lib/definitions";
import { Button } from "../ui/button";
import { Speech } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Storage from "@/supabase/storage";
import DB from "@/supabase/db";
import Spinner from "../ui/spinner";

interface RecordingsProps {
  recordings: Recording[];
  sessionId: string;
}

const Recordings = ({ recordings, sessionId }: RecordingsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recording, setRecording] = useState<Recording | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState<string>("");

  // Recorder and speech recognition setup
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef<string>("");

  const [stream, setStream] = useState<MediaStream | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setError("Web Speech API is not supported in this browser");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        let finalTranscript = finalTranscriptRef.current;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        finalTranscriptRef.current = finalTranscript;
        setTranscript(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event: SpeechRecognitionEvent) => {
        console.error("Speech recognition error", event.error);
        setError(`Speech recognition error: ${event.error}`);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorder?.stop();
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      // Reset state for new recording
      setTranscript("");
      finalTranscriptRef.current = "";
      audioChunksRef.current = [];
      setAudioUrl("");

      // Start audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setStream(stream);

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
      };

      recorder.start();
      setMediaRecorder(recorder);

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("Failed to access microphone");
    }
  };

  const cancelRecording = () => {
    setAudioUrl("");
    setTranscript("");
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

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    audioChunksRef.current = [];
  };

  const handleSaveRecording = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const audioResponse = await Storage.uploadRecording(
        audioBlob,
        `${crypto.randomUUID()}.webm`,
        sessionId
      );

      if (!audioResponse) {
        throw new Error("Failed to upload audio");
      }

      console.log("Audio uploaded successfully:", audioResponse);

      const newRecording: RecordingInsert = {
        audio_url: audioResponse,
        session_id: sessionId,
        transcript,
      };

      const res = await DB.createRecording(newRecording);

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
              {audioUrl && (
                <div className="mt-4">
                  <audio src={audioUrl} controls />
                </div>
              )}
            </div>

            {/* Transcription preview */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Transcription</h3>
              {error ? (
                <div className="text-red-500">{error}</div>
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
          <div className="flex  items-center gap-2 justify-end">
            <Button variant="destructive" onClick={cancelRecording}>
              Cancel
            </Button>

            <Button
              disabled={!transcript || isTranscribing || isLoading}
              onClick={() => {
                handleSaveRecording();
              }}
            >
              {isLoading ? <Spinner /> : "Save Recording"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Recordings;
