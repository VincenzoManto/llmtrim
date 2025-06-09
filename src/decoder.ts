import natural from 'natural';
import { TrimOptions } from './types';
import { PUNCTUATION, ARTICLES_PREPOSITIONS, NEGATION_WORDS } from './types/i18n';

export class Decoder {
  detrim(text: string, options: TrimOptions): string {

    const { stemmer, language = 'english', removeSpaces = true, removeStopwords = true, removePunctuation = false } = options;

    // Merge contractions
    text = text.replace(/['’]/g, '');

    // Tokenize
    const tokenizer = new natural.WordTokenizer();
    let tokenized = tokenizer.tokenize(text);

    // Remove punctuation
    if (removePunctuation) {
      tokenized = tokenized.filter((word: any) => !PUNCTUATION.includes(word));
    }

    // Remove stopwords
    if (removeStopwords) {
      const stopwords = natural.stopwords;
      const wordsToExclude = new Set([...stopwords, ...(ARTICLES_PREPOSITIONS[language] || [])]);
      NEGATION_WORDS[language]?.forEach((neg) => wordsToExclude.delete(neg));
      tokenized = tokenized.filter((word: string) => !wordsToExclude.has(word.toLowerCase()));
    }

    // Stemming
    let words = tokenized;
    if (stemmer) {
      let stemmerInstance: natural.Stemmer;
      if (stemmer === 'porter') {
        stemmerInstance = natural.PorterStemmer;
      } else if (stemmer === 'lancaster') {
        stemmerInstance = natural.LancasterStemmer;
      } else {
        throw new Error('Unsupported stemmer');
      }
      words = tokenized.map((word: any) => stemmerInstance.stem(word));
    }

    // Remove spaces
    const joinStr = removeSpaces ? '' : ' ';
    let trimmed = words.join(joinStr).trim();

    if (!removePunctuation) {
      trimmed = trimmed.replace(/\s([?.!,:;])/g, '$1');
    }

    return trimmed;
  }
}
