import axios from "axios";
import { getCookie } from "cookies-next";

type Artist = {
    id: string,
    name: string,
    type: string
}

export type SpotifyTrack = {
    artists: Artist[];
    album: {
        images: {
            height: number
            url: string
            width: number
        }[],
        id: string,
        name: string,
    },
    id: string
    name: string
    preview_url: string
    uri: string
    external_urls: {
        spotify: string
    }
}

export const spotifyClient = {
    createPlaylist: async (userId: string, name: string, description: string, isPublic: boolean) => {
        const accessToken = getCookie('accessToken');
        try {
            const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                name: name,
                description: description,
                public: isPublic
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    addItemsToPlaylist: async (playlistId: string, uris: string[]) => {
        const accessToken = getCookie('accessToken');
        try {
            const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                uris: uris,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    getAvailableDevices: async () => {
        const accessToken = getCookie('accessToken');
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/player/devices', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            console.log('availableDevice', response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    resumeSpotifyPlayback: async (deviceId: string) => {
        const accessToken = getCookie('accessToken');
        try {
            const response = await axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return response.data
        } catch (error) {
              console.log(error)
        }
    },
    pauseSpotifyPlayback: async (deviceId: string) => {
        const accessToken = getCookie('accessToken');
        try {
            const response = await axios.put(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return response.data
        } catch (error) {
              console.log(error)
        }
    },
    playSpotifyUrl: async (uris: string[], deviceId: string) => {
        const accessToken = getCookie('accessToken');
        try {
            const response = await axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                uris: uris,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return response.data;
        } catch (error) {
           console.log(error) 
           return null
        }
    },
    getCurrentUser: async () => {
        const accessToken = getCookie('accessToken');
        try {
            const response = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return response.data;
        } catch (error) {
           console.log(error) 
           return null
        }
    },
    getUserTopItems: async (type: 'artists' | 'tracks', time_range: string, limit?: number, offset?: number) => { 
        const params = new URLSearchParams({
            time_range: time_range || 'medium_term',
            limit: limit?.toString() || '20',
            offset: offset?.toString() || '0',
        })
        const url = `https://api.spotify.com/v1/me/top/${type}?` + params.toString();
        const accessToken = getCookie('accessToken');
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return response.data;
        } catch (error) {
           console.log(error) 
           return null
        }
    },
    getRecommendations: async (input: {
        seed_artists: string[],
        seed_tracks: string[],
        seed_genres: string[],
        limit?: number,
        market?: string,
        max_acousticness?: number,
        max_danceability?: number,
        max_duration_ms?: number,
        max_energy?: number,
        max_instrumentalness?: number,
        max_key?: number,
        max_liveness?: number,
        max_loudness?: number,
        max_mode?: number,
        max_popularity?: number,
        max_speechiness?: number,
        max_tempo?: number,
        max_time_signature?: number,
        max_valence?: number,
        min_acousticness?: number,
        min_danceability?: number,
        min_duration_ms?: number,
        min_energy?: number,
        min_instrumentalness?: number,
        min_key?: number,
        min_liveness?: number,
        min_loudness?: number,
        min_mode?: number,
        min_popularity?: number,
        min_speechiness?: number,
        min_tempo?: number,
        min_time_signature?: number,
        min_valence?: number,
        target_acousticness?: number,
        target_danceability?: number,
        target_duration_ms?: number,
        target_energy?: number,
        target_instrumentalness?: number,
        target_key?: number,
        target_liveness?: number,
        target_loudness?: number,
        target_mode?: number,
        target_popularity?: number,
        target_speechiness?: number,
        target_tempo?: number,
        target_time_signature?: number,
        target_valence?: number,
    }) => {
        const params = new URLSearchParams({
            limit: input.limit?.toString() || '20',
        })
        if (input.seed_artists.length > 0) {
            input.seed_artists.map((artist) => {
                params.append('seed_artists', artist);
            })
        }
        if (input.seed_genres.length > 0) {
            input.seed_genres.map((g) => {
                params.append('seed_genres', g);
            })
        }
        if (input.seed_tracks.length > 0) {
            input.seed_tracks.map((track) => {
                params.append('seed_tracks', track);
            })
        }
        if (input.market) {
            params.append('market', input.market);
        }

        Object.keys(input).map((k) => {
            const key = k as keyof typeof input;
            const data = input[key];
            if (key.startsWith('max_') && typeof data === 'number') {
                params.append(key, data.toString());
            }
            if (key.startsWith('min_') && typeof data === 'number') {
                params.append(key, data.toString());
            }
            if (key.startsWith('target_') && typeof data === 'number') {
                params.append(key, data.toString());
            }
        })


        const url = `https://api.spotify.com/v1/recommendations?` + params.toString();
        const accessToken = getCookie('accessToken');
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return response.data;
        } catch (error) {
           console.log(error) 
           return null
        }
    },
}
