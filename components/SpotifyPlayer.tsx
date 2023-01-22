import React, { useEffect } from 'react'
import { spotifyClient, SpotifyTrack } from '../lib/spotifyClient'
import { useSpotifyPlayer } from '../lib/hook/useSpotifyPlayer'

const SpotifyPlayer = (props: { currentTrack: SpotifyTrack | null }) => {
    const { currentTrack } = props
    const {player, deviceId, isActive} = useSpotifyPlayer();

    useEffect(() => {
      if (currentTrack && isActive && deviceId) {
        spotifyClient.playSpotifyUrl(currentTrack.uri, deviceId)
      }
    }, [currentTrack, isActive, deviceId])

    return (
      <div>
        {
          isActive && <>
            <button onClick={() => { player.previousTrack() }} >
                &lt;&lt;
            </button>

            <button onClick={() => { player.togglePlay() }} >
              PLAY / PAUSE
            </button>

            <button onClick={() => { player.nextTrack() }} >
                &gt;&gt;
            </button>
          </>
        }
      </div>
    )
}

export default SpotifyPlayer
