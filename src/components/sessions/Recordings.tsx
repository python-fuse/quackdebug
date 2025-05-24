import { useEffect, useState } from "react";
import { Recording } from "@/lib/definitions";
import { Button } from "../ui/button";
import { Speech } from "lucide-react";
import RecordingCard from "./RecordingCard";
import RecordingModal from "./RecordingModal";
import DB from "@/supabase/db";
import { toast } from "@/lib/utils";

interface RecordingsProps {
  initialRecordings: Recording[];
  sessionId: string;
}

const Recordings = ({ initialRecordings, sessionId }: RecordingsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>(initialRecordings);

  useEffect(() => {
    setRecordings(initialRecordings);
  }, [initialRecordings]);

  const handleRecordingSaved = async () => {
    const res = await DB.getRecordings(sessionId);
    if (res.error) {
      console.error("Error fetching recordings:", res.error);
      toast("error", res.error.message);
    } else {
      setRecordings(res.data);
    }
  };

  return (
    <>
      {/* Main recordings tab */}
      <div className="w-1/2 p-4 overflow-y-auto">
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
        <div className="mt-4 flex flex-col gap-y-2 ">
          {recordings.length == 0 && (
            <div className=" text-gray-500">
              No recordings available for this session.
            </div>
          )}

          {recordings.map((recording: Recording) => (
            <RecordingCard recording={recording} key={recording.id} />
          ))}
        </div>
      </div>

      {/* Recording modal */}
      <RecordingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sessionId={sessionId}
        onRecordingSaved={handleRecordingSaved}
      />
    </>
  );
};

export default Recordings;
