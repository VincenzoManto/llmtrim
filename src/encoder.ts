import natural from 'natural';
import { TrimOptions } from './types';
import { PUNCTUATION, ARTICLES_PREPOSITIONS, NEGATION_WORDS } from './types/i18n';

/**
 * Encoder class for text processing
 * This class provides methods to trim text by removing stopwords, punctuation, and applying stemming.
 * It also handles special cases like code snippets and JSON blocks to preserve their integrity.
 * @class Encoder
 * @example
 * const encoder = new Encoder();
 * const trimmedText = encoder.trim("The quick brown fox jumps over the lazy dog.", { stemmer: 'porter', removeStopwords: true });
 */
export class Encoder {
  /**
   * Trims the input text by removing stopwords, punctuation, and applying stemming.
   * It also preserves code snippets and JSON blocks by replacing them with placeholders during processing.
   * @param text The input text/prompt to be trimmed.
   * @param options Options for trimming the text.
   * @param options.stemmer The stemming algorithm to use ('porter' or 'lancaster').
   * @param options.language The language for stopwords and stemming (default is 'english').
   * @param options.removeSpaces Whether to remove spaces between words (default is true).
   * @param options.removeStopwords Whether to remove stopwords (default is true).
   * @param options.removePunctuation Whether to remove punctuation (default is false).
   * @returns The trimmed text.
   * @throws Will throw an error if an unsupported stemmer is specified.
   */
  trim(text: string, options: TrimOptions = {}): string {
    const { stemmer, language = 'english', removeSpaces = true, removeStopwords = true, removePunctuation = false } = options;

    const protectedBlocks: string[] = [];
    let protectedIndex = 0;

    // Match JSON-like or code-like patterns
    const codeJsonRegex = /(```[\s\S]*?```|{[\s\S]*?}|\[[\s\S]*?]|\bfunction\s+\w+\s*\([^)]*\)\s*{[\s\S]*?})/g;

    text = text.replace(codeJsonRegex, (match) => {
      const placeholder = `__PROTECTED_BLOCK_${protectedIndex}__`;
      protectedBlocks.push(match);
      protectedIndex++;
      return placeholder;
    });

    text = text.replace(/['’]/g, '');

    const tokenizer = new natural.WordTokenizer();
    let tokenized = tokenizer.tokenize(text);

    if (removePunctuation) {
      tokenized = tokenized.filter((word: any) => !PUNCTUATION.includes(word));
    }

    if (removeStopwords) {
      const stopwords = natural.stopwords;
      const wordsToExclude = new Set([...stopwords, ...(ARTICLES_PREPOSITIONS[language] || [])]);
      NEGATION_WORDS[language]?.forEach((neg) => wordsToExclude.delete(neg));
      tokenized = tokenized.filter((word: string) => !wordsToExclude.has(word.toLowerCase()));
    }

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

    const joinStr = removeSpaces ? '' : ' ';
    let trimmed = words.join(joinStr).trim();

    if (!removePunctuation) {
      trimmed = trimmed.replace(/\s([?.!,:;])/g, '$1');
    }

    // Restore protected blocks
    protectedBlocks.forEach((block, index) => {
      const placeholder = `__PROTECTED_BLOCK_${index}__`;
      trimmed = trimmed.replace(placeholder, block);
    });

    return trimmed;
  }
}

/**
 * Trims the input text by removing stopwords, punctuation, and applying stemming.
 * It also preserves code snippets and JSON blocks by replacing them with placeholders during processing.
 * @param text The input text/prompt to be trimmed.
 * @param options Options for trimming the text.
 * @param options.stemmer The stemming algorithm to use ('porter' or 'lancaster').
 * @param options.language The language for stopwords and stemming (default is 'english').
 * @param options.removeSpaces Whether to remove spaces between words (default is true).
 * @param options.removeStopwords Whether to remove stopwords (default is true).
 * @param options.removePunctuation Whether to remove punctuation (default is false).
 * @returns The trimmed text.
 * @throws Will throw an error if an unsupported stemmer is specified.
 */
export function trim(text: string, options: TrimOptions = {}): string {
  const encoder = new Encoder();
  return encoder.trim(text, options);
}
