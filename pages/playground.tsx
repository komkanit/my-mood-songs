import React, { useEffect, useRef } from "react";
import PreviewMusic from "../components/PreviewMusic";
import { spotifyClient } from "../lib/spotifyClient";

export default function Index() {
    const [user, setUser] = React.useState<any>(null);
    const [topTracks, setTopTracks] = React.useState<any[]>([]);
    const [topArtists, setTopArtists] = React.useState<any[]>([]);
    const [recommendationTracks, setRecommendationTracks] = React.useState<any[]>([])

    const [topTrackInput, setTopTrackInput] = React.useState<string>('medium_term,10,0');
    const [searchTrackTop, setSearchTrackTop] = React.useState<boolean>(false);

    const [topArtistsInput, setTopArtistsInput] = React.useState<string>('medium_term,10,0');
    const [searchArtistsTop, setSearchArtistsTop] = React.useState<boolean>(false);

    const [otherInputs, setOtherInputs] = React.useState<string>(
        `seed_tracks:
seed_artists:
seed_genres:indie r&b,chill r&b,pop`
    );
    const [searchRecommendation, setSearchRecommendation] = React.useState<boolean>(false);
    

    useEffect(() => {
        spotifyClient.getCurrentUser().then((response) => {
            if (response) {
                setUser(response)
            }
        })
        const topTracks = topTrackInput.split(',');
        spotifyClient.getUserTopItems("tracks", topTracks[0], +topTracks[1], +topTracks[2]).then((response) => {
            setTopTracks(response.items);
        })
        const topArtists = topArtistsInput.split(',');
        spotifyClient.getUserTopItems("artists", topArtists[0], +topArtists[1], +topArtists[2]).then((response) => {
            setTopArtists(response.items);
        })
    }, [searchTrackTop, searchArtistsTop]);
    useEffect(() => {
        const lines = otherInputs.split('\n');
        const data: any = {}
        for (const line of lines) {
            const [key, value] = line.split(':');
            data[key] = value.split(',').filter((d) => d);
        }
        console.log(data)
        if (data.seed_tracks?.length === 0) {
            data.seed_tracks = topTracks.slice(0, 5).map((track: any) => track.id);
        }

        if (data.seed_artists?.length === 0) {
            data.seed_artists = topArtists.slice(0, 5).map((artist: any) => artist.id);
        }
        if (data.seed_artists?.length > 0 && data.seed_tracks?.length > 0 && data.seed_genres?.length > 0) {
            spotifyClient.getRecommendations(data).then((response) => {
                console.log(response);
                response?.tracks && setRecommendationTracks(response.tracks);
            })
        }
    }, [searchRecommendation])
    return <div>
        <h1>Test</h1>
        {
            user && (
                <>
                    <p>{user.display_name}</p>
                    <p>{user.email}</p>
                </>
            )
        }
        <div style={{display: 'flex'}}>
            <div style={{flex: 1}}>
                <h1>Top Tracks</h1>
                <input value={topTrackInput} type="text" style={{width: '200px'}} onChange={(e) => setTopTrackInput(e.target.value)} />
                <button onClick={() => setSearchTrackTop(!searchTrackTop)}>search</button>
                {
                    topTracks.map((track: any) => (
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
            <div style={{flex: 1}}>
                <h1>Top Artists</h1>
                <input value={topArtistsInput} type="text" style={{width: '200px'}} onChange={(e) => setTopArtistsInput(e.target.value)} />
                <button onClick={() => setSearchArtistsTop(!searchArtistsTop)}>search</button>
                {
                    topArtists.map((artist: any) => (
                        <div key={artist.id}>
                            <p>{artist.name} : {artist.id}</p>
                            <span>{artist.genres.join(', ')}</span>
                        </div>
                    ))
                }
            </div>
        </div>
        <h1>Recommendation Tracks</h1>
        <textarea style={{height: '200px', width: '400px'}} value={otherInputs} onChange={(e) => setOtherInputs(e.target.value)} />
        <button onClick={() => setSearchRecommendation(!searchRecommendation)}>search</button>
        <p style={{color: 'grey'}}>Example seed_tracks:xxx,yyy,xxx (DO NOT ADD ANY SPACE BETWEEN VALUE)</p>
        <p>Available genres: acoustic, afrobeat, alt-rock, alternative, ambient, anime, black-metal, bluegrass, blues, bossanova, brazil, breakbeat, british, cantopop, chicago-house, children, chill, classical, club, comedy, country, dance, dancehall, death-metal, deep-house, detroit-techno, disco, disney, drum-and-bass, dub, dubstep, edm, electro, electronic, emo, folk, forro, french, funk, garage, german, gospel, goth, grindcore, groove, grunge, guitar, happy, hard-rock, hardcore, hardstyle, heavy-metal, hip-hop, holidays, honky-tonk, house, idm, indian, indie, indie-pop, industrial, iranian, j-dance, j-idol, j-pop, j-rock, jazz, k-pop, kids, latin, latino, malay, mandopop, metal, metal-misc, metalcore, minimal-techno, movies, mpb, new-age, new-release, opera, pagode, party, philippines-opm, piano, pop, pop-film, post-dubstep, power-pop, progressive-house, psych-rock, punk, punk-rock, r-n-b, rainy-day, reggae, reggaeton, road-trip, rock, rock-n-roll, rockabilly, romance, sad, salsa, samba, sertanejo, show-tunes, singer-songwriter, ska, sleep, songwriter, soul, soundtracks, spanish, study, summer, swedish, synth-pop, tango, techno, trance, trip-hop, turkish, work-out, world-music</p>
        {
            recommendationTracks.map((track: any) => (
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
    </div>;
}
