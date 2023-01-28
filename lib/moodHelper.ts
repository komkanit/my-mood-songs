type MoodConfig = {
    [key: string]: MoodConfigValue
}
export type MoodConfigValue = {
    spotifyConfig: any
    text: string
    feelings: string[]
    colors: string[]
}
export type FeelingType = {feeling: string, mood: string, colors: string[]}
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
        text: 'Happy',
        feelings: ['Fullfilled', 'Happy', 'Joyfull', 'Good', 'Satisfied', 'Pleased', 'Productive', 'Active', 'Energetic', 'Focus', 'Motivated'],
        colors: ['bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900'],
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
        text: 'sad',
        feelings: ['Sad', 'Lonely', 'Depressed', 'Tired', 'Bored', 'Empty', 'Lazy', 'Exhausted', 'Disgust', 'Sick'],
        colors: ['bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900'],
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
        feelings: ['Angry', 'Frustrated', 'Annoyed', 'Irritated', 'Anxious', 'Grumpy'],
        colors: ['bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900'],
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
        feelings: ['Normal', 'Average', 'Neutral', 'Okay', 'Fine', 'Uneventful'],
        colors: ['bg-orange-50', 'bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-orange-500', 'bg-orange-600', 'bg-orange-700', 'bg-orange-800', 'bg-orange-900'],
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
        feelings: ['Unsure', 'Insecure', 'Dissociate', 'Nervous', 'Afraid', 'Worried', 'Concern', 'Troubled'],
        colors: ['bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400', 'bg-yellow-500', 'bg-yellow-600', 'bg-yellow-700', 'bg-yellow-800', 'bg-yellow-900'],
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
    listFeelings: () => {
        const feelings: FeelingType[] = [];
        Object.keys(mood).forEach((moodId) => {
            feelings.push(...mood[moodId].feelings.map(f => ({ feeling: f, mood: moodId, colors: mood[moodId].colors})));
        });
        return [...new Set(feelings)];
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
