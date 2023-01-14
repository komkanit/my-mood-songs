type MoodConfig = {
    [key: string]: {
        spotifyConfig: any
        text: string
    }
}
const mood: MoodConfig = {
    happy: {
        spotifyConfig: {
        },
        text: 'Happy'
    },
    sad: {
        spotifyConfig: {
        },
        text: 'sad'
    }
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
    }
}
