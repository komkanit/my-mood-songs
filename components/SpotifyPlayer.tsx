import React, { useEffect } from 'react'
import { spotifyClient, SpotifyTrack } from '../lib/spotifyClient'
import { useSpotifyPlayer } from '../lib/hook/useSpotifyPlayer'
import Image from 'next/image'

const SpotifyPlayer = (props: { currentTrack: SpotifyTrack | null, playlist: SpotifyTrack[], setCurrentTrack: React.Dispatch<React.SetStateAction<SpotifyTrack | null>> }) => {
    const { currentTrack } = props
    const {deviceId, isActive, isPlaying, togglePlay} = useSpotifyPlayer();
    const ignoreFirstRender = React.useRef(true);

    useEffect(() => {
      if (!ignoreFirstRender.current) {
        if (currentTrack && isActive && deviceId) {
          spotifyClient.playSpotifyUrl([currentTrack.uri], deviceId)
          .then(() => {
            togglePlay();
          })
        }
      }
      return () => {
        ignoreFirstRender.current = false;
      }
    }, [currentTrack, isActive, deviceId])

    const nextTrack = () => {
      const currentIndex = props.playlist.findIndex((track) => track.id === currentTrack?.id)
      const nextTrack = props.playlist[currentIndex === props.playlist.length - 1 ? 0 : currentIndex + 1]
      if (nextTrack) {
        props.setCurrentTrack(nextTrack)
      }
    }
    const previousTrack = () => {
      const currentIndex = props.playlist.findIndex((track) => track.id === currentTrack?.id)
      const previousTrack = props.playlist[currentIndex === 0 ? props.playlist.length - 1 : currentIndex - 1]
      if (previousTrack) {
        props.setCurrentTrack(previousTrack)
      }
    }

    return (
      <div className='my-5'>
        {
          isActive ? <div className="text-center">
            <div className="mb-3">
              <p className={currentTrack ? "visible" : "invisible"}>
                {currentTrack ? currentTrack?.name : "none"}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button onClick={() => { previousTrack() }} >
                <Image src="/images/prev-icon.svg" height={25} width={25} alt="previous icon" />
              </button>

              <button className="mx-10" onClick={() => { togglePlay() }} >
                <Image src={isPlaying ? "/images/play-icon.svg" : "/images/pause-icon.svg"} height={40} width={40} alt="previous icon" />
              </button>

              <button onClick={() => { nextTrack() }} >
                <Image src="/images/next-icon.svg" height={25} width={25} alt="next icon" />
              </button>
            </div>
          </div>
          : <div className="text-center animate-bounce"><p>Loading Web Playback SDK...</p></div>
        }
      </div>
    )
}

export default SpotifyPlayer
