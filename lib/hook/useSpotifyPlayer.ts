import { getCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";

export const useSpotifyPlayer = () => {
    const [currentPlayer, setCurrentPlayer] = useState<any>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [isActive, setActive] = useState<boolean>(false);
    const [isPlaying, setPlaying] = useState<boolean>(false);
    let shouldIgnoreFirstRender = useRef<boolean>(true);
    let playerRef = useRef<any>(null);
    const togglePlay = () => {
      if (playerRef.current && deviceId && isActive) {
        playerRef.current.togglePlay();
      }
    }
    useEffect(() => {
      if (!shouldIgnoreFirstRender.current) {
        console.log('init spotify player')
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);


        window.onbeforeunload = function() {
          console.log('onbeforeunload');
          if (playerRef.current) {
            playerRef.current.pause();
            playerRef.current.disconnect();
          }
        };

        (window as any).onSpotifyWebPlaybackSDKReady = () => {
          console.log('onSpotifyWebPlaybackSDKReady')
          const token = getCookie('accessToken');
          const player = new (window as any).Spotify.Player({
              name: 'Web Playback SDK',
              getOAuthToken: (cb: any) => { cb(token); },
              volume: 0.5
          })
          playerRef.current = player
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
        console.log('clean-up', shouldIgnoreFirstRender.current)
        if (!shouldIgnoreFirstRender.current) {
          window.onbeforeunload = null;
          (window as any).onSpotifyWebPlaybackSDKReady = null;
          if (playerRef.current) {
              console.log('disconnecting player');
              // playerRef.current.pause();
              // playerRef.current.removeListener('ready');
              // playerRef.current.removeListener('not_ready');
              // playerRef.current.removeListener('player_state_changed');
              playerRef.current.disconnect()
          }
        }
        shouldIgnoreFirstRender.current = false;
      }

    }, [])
    return {
        togglePlay,
        deviceId,
        isActive,
        isPlaying,
    }
}
