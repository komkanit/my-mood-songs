import { getCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";

export const useSpotifyPlayer = () => {
    const [currentPlayer, setCurrentPlayer] = useState<any>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [isActive, setActive] = useState<boolean>(false);
    const [isPlaying, setPlaying] = useState<boolean>(false);
    let shouldInitSpotifyPlayer = useRef<boolean>(false);
    let playerRef = useRef<any>(null);
    useEffect(() => {
      if (shouldInitSpotifyPlayer.current) {
        window.onbeforeunload = function() {
          console.log('onbeforeunload');
          if (playerRef.current) {
            playerRef.current.pause();
            playerRef.current.disconnect();
          }
        };

        shouldInitSpotifyPlayer.current = false;
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        (window as any).onSpotifyWebPlaybackSDKReady = () => {
          const token = getCookie('accessToken');
          const player = new (window as any).Spotify.Player({
              name: 'Web Playback SDK',
              getOAuthToken: (cb: any) => { cb(token); },
              volume: 0.5
          })
          playerRef.current = player
          setCurrentPlayer(player)
          player.addListener('ready', ({ device_id }: { device_id: string }) => {
            console.log('Ready with Device ID', device_id);
            setDeviceId(device_id)
            setActive(true)
          });

          player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
              console.log('Device ID has gone offline', device_id);
              setDeviceId(null)
              setActive(false)
          })
          player.addListener('player_state_changed', (state: any) => {
              setPlaying(!state.paused)
          })
          player.connect()
        }
      }
      return () => {
        shouldInitSpotifyPlayer.current = true;
        window.onbeforeunload = null;
        if (playerRef.current) {
            console.log('disconnecting player');
            playerRef.current.pause();
            playerRef.current.removeListener('ready');
            playerRef.current.removeListener('not_ready');
            playerRef.current.removeListener('player_state_changed');
            playerRef.current.disconnect()
        }
      }

    }, [])
    return {
        player: currentPlayer,
        deviceId,
        isActive,
        isPlaying,
    }
}
