import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export const useSpotifyPlayer = () => {
    const [player, setPlayer] = useState<any>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [isActive, setActive] = useState<boolean>(false);
    useEffect(() => {
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
        console.log('*** player', player)
        player.addListener('ready', ({ device_id }: { device_id: string }) => {
          console.log('Ready with Device ID', device_id);
          console.log('*** player ready', player)
          setPlayer(player)
          setDeviceId(device_id)
          setActive(true)
        });

        player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
            console.log('Device ID has gone offline', device_id);
            setPlayer(null)
            setDeviceId(null)
            setActive(false)
        })
        player.connect()
      }
    }, [])
    return {
        player,
        deviceId,
        isActive
    }
}
