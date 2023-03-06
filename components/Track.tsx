import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SpotifyTrack } from "../lib/spotifyClient";

export default function Track(props: {track: SpotifyTrack, onClick: (track: SpotifyTrack) => void, onMenuClick: (track: SpotifyTrack) => void, showMenu: boolean}) {
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
        <div className="flex">
            <Image
                className="mr-3 cursor-pointer"
                onClick={() => props.onClick(props.track)}
                height={130}
                width={130}
                src={props.track.album.images[0].url}
                alt={props.track.album.name}
            />
            <div className="flex-1">
                <p className="pt-3 text-lg">{props.track.name}</p>      
                <p className="pt-2 text-theme-text-grey">{props.track.artists.map((a) => a.name).join(', ')}</p>
            </div>
            <div className="mt-5 relative">
                <span className={`text-2xl ${props.showMenu ? "text-theme-green" : ""} cursor-pointer`} onClick={() => props.onMenuClick(props.track)}>...</span>
                {
                    props.showMenu && <div className="bg-theme-green absolute right-0 w-40 p-2">
                        <span className="flex items-center text-white">
                            <Image className="inline-block mr-3" src="/images/spotify-white.svg" height={20} width={20} alt="open in spority" />
                            <Link target="_blank" href={props.track.external_urls.spotify}>Open in Spotify</Link>
                        </span>
                    </div>
                }
            </div>
        </div>
      </div>
    );
}
