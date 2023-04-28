import { useEffect, useRef, useState } from "react"
import { MoodConfigValue, moodHelper } from "../moodHelper";
import { spotifyClient, SpotifyTrack } from "../spotifyClient"

export const useRecommendedTracks = (mood: MoodConfigValue | null) => {
  const [recommendedTracks, setRecommendedTracks] = useState<SpotifyTrack[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const shouldCallRecommendedTracks = useRef(true);

  useEffect(() => {
    if (shouldCallRecommendedTracks.current) {
      const getUserTopTracksAsync = spotifyClient.getUserTopItems('tracks', 'medium_term', 7);
      const getUserTopArtistsAsync = spotifyClient.getUserTopItems('artists', 'medium_term', 7);
      Promise.all([getUserTopTracksAsync, getUserTopArtistsAsync]).then((values) => {
        const userTopTracks = values[0];
        const userTopArtists = values[1];
        const genres = userTopArtists.items.reduce((accumulator: string[], currentValue: any) => {
          return [
            ...accumulator,
            ...currentValue.genres,
          ]
        }, []);
        const seedGenres = moodHelper.artistGenesToAvailableGenres(genres);
        spotifyClient.getRecommendations({
          seed_tracks: userTopTracks.items.slice(0, 5).map((track: any) => track.id),
          seed_artists: userTopArtists.items.slice(0, 5).map((artist: any) => artist.id),
          seed_genres: seedGenres,
          limit: 20,
          ...mood?.spotifyConfig,
        }).then((response) => {
          setRecommendedTracks(response.tracks);
          setIsLoading(false);
        });
      })
    }
    return () => {
      shouldCallRecommendedTracks.current = false;
    }
  }, []);

  return {
    recommendedTracks,
    isLoading
  }
}
