import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { moodHelper } from '../../lib/moodHelper'
import PreviewMusic from '../../components/PreviewMusic'
import { isAuth } from '../../lib/isAuth'
import { useRecommendedTracks } from '../../lib/hook/useRecommendedTracks'
import SpotifyPlayer from '../../components/SpotifyPlayer'
import Track from '../../components/Track'

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
  const [currentTrack, setCurrentTrack] = useState<any>(null);

  useEffect(() => {
    if (!mood) {
      router.push('/moods');
    }
  }, []);

  return (
    <div>
      <h1>You are currently feeling {mood_name}</h1>
      <SpotifyPlayer currentTrack={currentTrack} />
      {
            recommendedTracks.map((track: any) => (
                <Track key={track.id} track={track} onClick={(track) => setCurrentTrack(track)} />
            ))
        }
    </div>
  )
}

export default MoodPage
