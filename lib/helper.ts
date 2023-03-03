export const shuffle = <T>(array: T[]): T[] => {
    let currentIndex = array.length,  randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export const random = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

