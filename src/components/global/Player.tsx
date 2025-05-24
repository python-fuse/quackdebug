import React from "react";
import WavesurferPlayer from "@wavesurfer/react";
import { Button } from "../ui/button";
import { FastForward, Forward, Pause, Play, Rewind } from "lucide-react";

interface PlayerProps {
  audioSrc: string;
}

const Player: React.FC<PlayerProps> = ({ audioSrc }) => {
  const [wavesurfer, setWavesurfer] = React.useState<any>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  const skip = (seconds: number) => {
    const currentTime = wavesurfer.getCurrentTime();
    const newTime = currentTime + seconds;
    wavesurfer.setTime(Math.min(newTime, wavesurfer.getDuration()));
  };

  return (
    <div className="flex flex-col">
      <WavesurferPlayer
        height={50}
        waveColor={"blue"}
        barWidth={4}
        url={audioSrc}
        onReady={onReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="flex items-center space-x-2 justify-center">
        <Button
          variant={"outline"}
          className="aspect-square w-max rounded-full"
          onClick={() => skip(-10)}
          disabled={!wavesurfer}
        >
          <Rewind />
        </Button>

        <Button
          variant={"outline"}
          className="aspect-square w-max rounded-full bg-blue-500 text-white hover:bg-blue-600"
          onClick={onPlayPause}
          disabled={!wavesurfer}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>

        <Button
          variant={"outline"}
          className="aspect-square w-max rounded-full"
          onClick={() => skip(10)}
          disabled={!wavesurfer}
        >
          <FastForward />
        </Button>
      </div>
    </div>
  );
};

export default Player;
