import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { moodHelper } from '../../lib/moodHelper'
import { spotifyClient } from '../../lib/spotifyClient'
import PreviewMusic from '../../components/PreviewMusic'
import { isAuth } from '../../lib/isAuth'

export const getServerSideProps: GetServerSideProps<{ isLogin: boolean }> = async (context) => {
    const isLogin = await isAuth({ req: context.req, res: context.res, isRequiredRefreshToken: true });
    return {
        props: {
            isLogin,
        }
    }
  }

const MoodPage = () => {
  const router = useRouter()
  const [recommendedTracks, setRecommendedTracks] = React.useState<any>([])
  const { mood_name } = router.query
  useEffect(() => {
    const mood = moodHelper.getMood(mood_name as string);
    if (!mood) {
      router.push('/moods');
    }
    const getUserTopTracksAsync = spotifyClient.getUserTopItems('tracks', 'medium_term', 7);
    const getUserTopArtistsAsync = spotifyClient.getUserTopItems('artists', 'medium_term', 7);
    Promise.all([getUserTopTracksAsync, getUserTopArtistsAsync]).then((values) => {
      const userTopTracks = values[0];
      const userTopArtists = values[1];
      spotifyClient.getRecommendations({
        seed_tracks: userTopTracks.items.slice(0, 5).map((track: any) => track.id),
        seed_artists: userTopArtists.items.slice(0, 5).map((artist: any) => artist.id),
        seed_genres: ['r-n-b'],
        limit: 20,
        ...mood.spotifyConfig,

      }).then((response) => {
        setRecommendedTracks(response.tracks);
      });
    })


  }, []);

  return (
    <div>
      <h1>You are currently feeling {mood_name}</h1>
      {
            recommendedTracks.map((track: any) => (
                <div key={track.id}>
                    <p>{track.name} : {track.id}</p>
                    <ul>
                        {track.artists.map((artist: any) => (
                            <li key={artist.id}>{artist.name} : {artist.id}</li>
                        ))}
                    </ul>
                    <PreviewMusic previewUrl={track.preview_url} />
                </div>
            ))
        }
    </div>
  )
}

export default MoodPage
