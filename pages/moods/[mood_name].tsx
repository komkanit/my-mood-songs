import React, { useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { MoodConfigValue, moodHelper } from '../../lib/moodHelper'
import { isAuth } from '../../lib/isAuth'
import { useRecommendedTracks } from '../../lib/hook/useRecommendedTracks'
import SpotifyPlayer from '../../components/SpotifyPlayer'
import Track from '../../components/Track'
import { spotifyClient, SpotifyTrack } from '../../lib/spotifyClient'
import Image from 'next/image'
import { useSpotifyPlayer } from '../../lib/hook/useSpotifyPlayer'
import AddToPlayList from '../../components/AddToPlayList'

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

const Title = (props: {moodName: string, mood: MoodConfigValue | null}) => {
  const [status, setStatus] = useState('idle');
  useEffect(() => {
      const timeoutId1 = setTimeout(() => {
          setStatus('show');
      }, 100)
      const timeoutId2 = setTimeout(() => {
          setStatus('hide')
      }, 1500)
      return () => {
          clearTimeout(timeoutId1);
          clearTimeout(timeoutId2);
      }
  }, []);
  let classStatus = 'opacity-0';
  if (status === 'show') {
      classStatus = 'opacity-100 h-40vh';
  } else if (status === 'hide') {
      classStatus = 'opacity-0 h-30vh';
  }
  const transitionClass = 'transition-all ease-in-out duration-1000';
  return (
      <div className={`${transitionClass} ${classStatus} flex items-end justify-center`}>
          <div>
              <p className={`text-3xl font-bold text-center mt-3 mb-1`}>Let&apos;s see your</p>
              <p className={`text-3xl font-bold ${props.mood?.textColors[0]} text-center mt-3 mb-1`}><span className="text-4xl">{props.moodName}</span> mood musics!</p>
          </div>
      </div>
  );
};

const MoodPage = () => {
  const router = useRouter()
  const mood_name = router.query.mood_name as string
  const mood = moodHelper.getMoodByFeeling(mood_name);
  const { recommendedTracks, isLoading } = useRecommendedTracks(mood);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [user, setUser] = useState<any | null>(null)
  const shouldCallgetCurrentUser = useRef(true);
  const [isShow, setIsShow] = useState(false);
  const userImage = user?.images[0].url;

  useEffect(() => {
    if (!mood) {
      router.push('/moods');
    }
    if (shouldCallgetCurrentUser.current) {
      spotifyClient.getCurrentUser()
      .then((response) => {
        const user = response
        setUser(user)
      })
    }
    const timeoutId = setTimeout(() => {
        setIsShow(true);
    }, 2000)
    return () => {
      shouldCallgetCurrentUser.current = false;
      clearTimeout(timeoutId);
    }
  }, []);

  const onTrackClick = (track: SpotifyTrack) => {
    setCurrentTrack(track)
  }

  return (
    !isShow ?
    <Title moodName={mood_name} mood={mood} />
    :
    <div className="mt-10">
      <div className="text-center">
        <div className="inline-block relative">
          {
            userImage && <Image className="rounded-full" src={userImage} width={100} height={100} alt="user profile" />
          }
          <div className={`w-10 h-10 rounded-full ${mood?.colors[0]} absolute -right-2 -bottom-2 flex justify-center items-center`}>
            <Image src={`/images/mood_emoji/${mood_name.toLocaleLowerCase()}.png`} width="20" height="20" alt="" />
          </div>
        </div>
      </div>
      <h1 className="text-center text-2xl font-bold mt-2">{mood_name} mood!</h1>
      {
        user && <AddToPlayList moodName={mood_name} tracks={recommendedTracks} userId={user.id} />
      }
      <SpotifyPlayer playlist={recommendedTracks} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />
      <div className={`${mood?.colors[0]}`}>
        {
            recommendedTracks.map((track) => (
                <div key={track.id} className={`py-4 px-4 ${track.id === currentTrack?.id ? "bg-gray-900/30" : ""}`}>
                  <Track track={track} onClick={onTrackClick} />
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default MoodPage
