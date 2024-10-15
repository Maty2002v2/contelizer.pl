export const useMixingLetters = (lineOfText: string): string => {
    const words = lineOfText.split(' ');

    return words.map(word => {
        const match = word.match(/^(\P{L}*)(\p{L}+)(\P{L}*)$/u);

        if (match) {
            const [, before, coreWord, after] = match;
            return before + shuffleWord(coreWord) + after;
        }

        return shuffleWord(word);
    }).join(' ');
}

const shuffleWord = (word: string) => {
    if (word.length <= 3) return word;

    const letters = Array.from(word);
    const first = letters.shift();
    const last = letters.pop();

    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    return `${first}${letters.join('')}${last}`
}
