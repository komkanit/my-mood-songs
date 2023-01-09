import { useRef } from "react";

export default function PreviewMusic(props: { previewUrl: string }) {
    const audioRef = useRef(null) as any;
  
    const playMusic = () => {
      audioRef.current.play();
    };
    const pauseMusic = () => {
        audioRef.current.pause();
    };
    const restartMusic = () => {
        audioRef.current.currentTime = 0;
    }

    return (
      <div>
        <audio ref={audioRef} src={props.previewUrl} />
        <button onClick={playMusic}>Preview</button>
        <button onClick={pauseMusic}>Pause</button>
        <button onClick={restartMusic}>Restart</button>
      </div>
    );
}
