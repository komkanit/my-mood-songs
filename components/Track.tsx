import Image from "next/image";
import { useRef } from "react";
import { SpotifyTrack } from "../lib/spotifyClient";

export default function Track(props: { track: SpotifyTrack, onClick: (track: SpotifyTrack) => void }) {
    const audioRef = useRef(null) as any;
  
    const playMusic = () => {
        if (!props.track.preview_url) {
            return;
        }
        const promise: any = audioRef.current.play();
        if (promise !== undefined) {
            promise.then(() => {
            // Autoplay started!
            }).catch((error: any) => {
                console.log(error)
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
            });
        }
    };
    const resetMusic = () => {
        if (!props.track.preview_url) {
            return;
        }
        audioRef.current.currentTime = 0;
        const promise = audioRef.current.pause();
        if (promise !== undefined) {
            promise.then(() => {
            // Autoplay started!
            }).catch((error: any) => {
                console.log(error)
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
            });
        }
    }

    return (
      <div>
        <audio ref={audioRef} src={props.track.preview_url} playsInline />
        <div style={{display: 'flex', marginBottom: '10px'}}>
            <Image
                // onMouseEnter={() => playMusic()}
                // onMouseLeave={() => resetMusic()}
                onClick={() => props.onClick(props.track)}
                height={100}
                width={100}
                src={props.track.album.images[0].url}
                alt={props.track.album.name}
            />
            <div>
                <p>{props.track.name}</p>      
                <p>{props.track.artists.map((a) => a.name).join(', ')}</p>
            </div>
        </div>
      </div>
    );
}
