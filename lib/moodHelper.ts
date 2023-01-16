type MoodConfig = {
    [key: string]: {
        spotifyConfig: any
        text: string
    }
}
const mood: MoodConfig = {
    happy: {
        spotifyConfig: {
            target_acouticness:0,
            target_instrumentalness:1,
            target_danceability:1,
            target_energy:1,
            target_loundness:1,
            target_valence:1,
            min_tempo:160,
        },
        text: 'Happy'
    },
    sad: {
        spotifyConfig: {
        target_acouticness:1,
        target_instrumentalness:1,
        target_danceability:0,
        target_energy:0,
        target_loundness:0,
        target_valence:0,
        max_tempo:80,
        },
        text: 'sad'
    },
    angry: {
        spotifyConfig: {
            target_acouticness:0,
            target_instrumentalness:0,
            target_danceability:1,
            target_energy:1,
            target_loundness:1,
            target_valence:0,
            min_tempo:160,
        },
        text: 'angry',
    },
    normal: {
        spotifyConfig: {
            target_acouticness:0.5,
            target_instrumentalness:0.5,
            target_danceability:0.5,
            target_energy:0.5,
            target_loundness:0.5,
            target_valence:0.5,
            Min_tempo:80,
        },
        text: 'normal',
    },
    unsure: {
        spotifyConfig: {
            target_acouticness:0,
            target_instrumentalness:1,
            target_danceability:0,
            target_energy:1,
            target_loundness:1,
            target_valence:0,
            max_tempo:85,
        },
        text: 'unsure',
    },
}
export const moodHelper = {
    getMood: (moodId: string) => {
        return mood[moodId];
    },
    listMoodIds: () => {
        return Object.keys(mood);
    },
    listMoods: () => {
        return mood;
    },
    toAvailableGenre: (artistGenre: string) => {
        const key = artistGenre.split(' ').join('-').toLocaleLowerCase();
        if (availableGenres.includes(key)) {
            return key;
        }
        const g = availableGenres.find((genre) => key.includes(genre))
        if (g) {
            return g
        }
        if (key.includes('r&b') || key.includes('r-&-b') || key.includes('r-and-b')) {
            return 'r-n-b';
        }
        return null
    },
    artistGenesToAvailableGenres: (artistGenres: string[]) => {
        artistGenres.sort((a, b) => a.length - b.length);
        const availableGenres = artistGenres.map((genre) => moodHelper.toAvailableGenre(genre))
        const a = availableGenres.filter((genre) => genre !== null);
        return [...new Set(a)].slice(0, 5);
    }
}

const availableGenres: string[] = [
    "acoustic",
    "afrobeat",
    "alt-rock",
    "alternative",
    "ambient",
    "anime",
    "black-metal",
    "bluegrass",
    "blues",
    "bossanova",
    "brazil",
    "breakbeat",
    "british",
    "cantopop",
    "chicago-house",
    "children",
    "chill",
    "classical",
    "club",
    "comedy",
    "country",
    "dance",
    "dancehall",
    "death-metal",
    "deep-house",
    "detroit-techno",
    "disco",
    "disney",
    "drum-and-bass",
    "dub",
    "dubstep",
    "edm",
    "electro",
    "electronic",
    "emo",
    "folk",
    "forro",
    "french",
    "funk",
    "garage",
    "german",
    "gospel",
    "goth",
    "grindcore",
    "groove",
    "grunge",
    "guitar",
    "happy",
    "hard-rock",
    "hardcore",
    "hardstyle",
    "heavy-metal",
    "hip-hop",
    "holidays",
    "honky-tonk",
    "house",
    "idm",
    "indian",
    "indie",
    "indie-pop",
    "industrial",
    "iranian",
    "j-dance",
    "j-idol",
    "j-pop",
    "j-rock",
    "jazz",
    "k-pop",
    "kids",
    "latin",
    "latino",
    "malay",
    "mandopop",
    "metal",
    "metal-misc",
    "metalcore",
    "minimal-techno",
    "movies",
    "mpb",
    "new-age",
    "new-release",
    "opera",
    "pagode",
    "party",
    "philippines-opm",
    "piano",
    "pop",
    "pop-film",
    "post-dubstep",
    "power-pop",
    "progressive-house",
    "psych-rock",
    "punk",
    "punk-rock",
    "r-n-b",
    "rainy-day",
    "reggae",
    "reggaeton",
    "road-trip",
    "rock",
    "rock-n-roll",
    "rockabilly",
    "romance",
    "sad",
    "salsa",
    "samba",
    "sertanejo",
    "show-tunes",
    "singer-songwriter",
    "ska",
    "sleep",
    "songwriter",
    "soul",
    "soundtracks",
    "spanish",
    "study",
    "summer",
    "swedish",
    "synth-pop",
    "tango",
    "techno",
    "trance",
    "trip-hop",
    "turkish",
    "work-out",
    "world-music"
]
