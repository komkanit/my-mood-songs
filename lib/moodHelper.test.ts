import { moodHelper } from "./moodHelper";

describe('moodHelper', () => {
    it.each([
        ['pop', 'pop'],
        ['K Pop', 'k-pop'],
        ['Thai pop', 'pop'],
        ['k-pop girl group', 'k-pop'],
        ['electropop', 'electro'],
        ['canadian contemporary r&b', 'r-n-b'],
        ['asian american hip hop', 'hip-hop'],
        ['thai folk rock', 'folk'],
    ])('should map availableGenre correctly when genre=%s', (genre, expected) => {
        const availableGenre = moodHelper.toAvailableGenre(genre);
        expect(availableGenre).toEqual(expected);
    });
})
