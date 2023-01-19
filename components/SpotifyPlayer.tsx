import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { moodHelper } from '../lib/moodHelper'
import { spotifyClient, SpotifyTrack } from '../lib/spotifyClient'
import { getCookie } from 'cookies-next'

const SpotifyPlayer = (props: { currentTrack: SpotifyTrack }) => {
    const { currentTrack } = props
  const [spotifyPlayer, setSpotifyPlayer] = useState<any>(undefined);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    if (!spotifyPlayer) {
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
        player.addListener('ready', ({ device_id }: { device_id: string }) => {
          console.log('Ready with Device ID', device_id);
          setSpotifyPlayer(player)
          setDeviceId(device_id)
          setActive(true)
        });

        player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
            console.log('Device ID has gone offline', device_id);
            setSpotifyPlayer(null)
            setDeviceId(null)
            setActive(false)
        })

        player.connect()
      }
    }
  }, [])
  useEffect(() => {
    if (currentTrack && deviceId) {
      spotifyClient.playSpotifyUrl(currentTrack.uri, deviceId)
    }
  }, [currentTrack, deviceId])

  return (
    <div>
      {
        isActive && <>
          <button onClick={() => { spotifyPlayer.previousTrack() }} >
              &lt;&lt;
          </button>

          <button onClick={() => { spotifyPlayer.togglePlay() }} >
            PLAY / PAUSE
          </button>

          <button onClick={() => { spotifyPlayer.nextTrack() }} >
              &gt;&gt;
          </button>
        </>
      }
    </div>
  )
}

export default SpotifyPlayer
