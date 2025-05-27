import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "@/lib/utils";

interface UseAudioRecorderReturn {
  audioUrl: string;
  audioBlob: Blob | null;
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  resetRecording: () => void;
  stream: MediaStream | null;
  error: string | null;
}

export default function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const audioChunksRef = useRef<Blob[]>([]);

  // Clean up function for media resources
  const cleanupMedia = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  }, [stream, audioUrl]);
  // Clean up on unmount
  useEffect(() => {
    return () => cleanupMedia();
  }, [cleanupMedia]);

  const startRecording = async () => {
    try {
      setError(null);
      audioChunksRef.current = [];
      setAudioUrl("");
      setAudioBlob(null);

      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setStream(newStream);

      const recorder = new MediaRecorder(newStream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("Failed to access microphone");
      toast("error", "Failed to access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    cleanupMedia();
    audioChunksRef.current = [];
    setAudioUrl("");
    setAudioBlob(null);
    setIsRecording(false);
  };

  return {
    audioUrl,
    audioBlob,
    isRecording,
    startRecording,
    stopRecording,
    resetRecording,
    stream,
    error,
  };
}
