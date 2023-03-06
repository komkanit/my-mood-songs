import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { moodHelper } from '../../lib/moodHelper'
import { isAuth } from '../../lib/isAuth'
import { useRecommendedTracks } from '../../lib/hook/useRecommendedTracks'
import SpotifyPlayer from '../../components/SpotifyPlayer'
import Track from '../../components/Track'
import { spotifyClient, SpotifyTrack } from '../../lib/spotifyClient'
import Image from 'next/image'
import { useSpotifyPlayer } from '../../lib/hook/useSpotifyPlayer'

export const getServerSideProps: GetServerSideProps<{ isLogin: boolean }> = async (context) => {
    const isLogin = await isAuth({ req: context.req, res: context.res, isRequiredRefreshToken: true });
    if (!isLogin) {
      return {
          redirect: {
              destination: '/',
              permanent: false,
          },
      }
    }
    return {
        props: {
            isLogin,
        }
    }
  }

const MoodPage = () => {
  const router = useRouter()
  const { mood_name } = router.query
  const mood = moodHelper.getMoodByFeeling(mood_name as string);
  const { recommendedTracks, isLoading } = useRecommendedTracks(mood);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [currentMenu, setCurrentMenu] = useState<SpotifyTrack | null>(null)
  const [userImage, setUserImage] = useState<string | null>(null)

  useEffect(() => {
    if (!mood) {
      router.push('/moods');
    }
    spotifyClient.getCurrentUser()
    .then((response) => {
      const user = response
      setUserImage(user.images[0].url)
    })
  }, []);

  const onMenuClick = (track: SpotifyTrack) => {
    if (currentMenu === track) {
      setCurrentMenu(null);
    } else {
      setCurrentMenu(track);
    }
  }

  return (
    <div className="mt-10">
      <div className="text-center">
        <div className="inline-block relative">
          {
            userImage && <Image className="rounded-full" src={userImage} width={100} height={100} alt="user profile" />
          }
          <div className={`w-12 h-12 rounded-full ${mood?.colors[2]} absolute -right-2 -bottom-2`}></div>
        </div>
      </div>
      <h1 className="text-center text-2xl font-bold mt-2">{mood_name}</h1>
      <SpotifyPlayer playlist={recommendedTracks} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />
      <div className={`${mood?.colors[2]}`}>
        {
            recommendedTracks.map((track) => (
                <div key={track.id} className={`py-4 px-4 ${track.id === currentTrack?.id ? "bg-gray-900/30" : ""}`}>
                  <Track track={track} onClick={(track) => setCurrentTrack(track)} onMenuClick={onMenuClick} showMenu={track.id === currentMenu?.id} />
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default MoodPage
