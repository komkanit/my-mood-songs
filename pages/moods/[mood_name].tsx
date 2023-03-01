import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { moodHelper } from '../../lib/moodHelper'
import { isAuth } from '../../lib/isAuth'
import { useRecommendedTracks } from '../../lib/hook/useRecommendedTracks'
import SpotifyPlayer from '../../components/SpotifyPlayer'
import Track from '../../components/Track'
import { SpotifyTrack } from '../../lib/spotifyClient'

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
  const mood = moodHelper.getMood(mood_name as string);
  const { recommendedTracks, isLoading } = useRecommendedTracks(mood);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [currentMenu, setCurrentMenu] = useState<SpotifyTrack | null>(null)

  useEffect(() => {
    if (!mood) {
      router.push('/moods');
    }
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
        <div className={`inline-block h-20 w-20 rounded-full ${mood.colors[2]}`}>

        </div>
      </div>
      <h1 className="text-center text-2xl font-bold">{mood_name}</h1>
      <SpotifyPlayer playlist={recommendedTracks} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />
      <div className={`${mood.colors[2]} p-5`}>
        {
            recommendedTracks.map((track) => (
                <div key={track.id} className="pb-5">
                  <Track track={track} onClick={(track) => setCurrentTrack(track)} onMenuClick={onMenuClick} showMenu={track.id === currentMenu?.id} />
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default MoodPage
