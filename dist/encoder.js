"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encoder = void 0;
exports.trim = trim;
const natural_1 = __importDefault(require("natural"));
const i18n_1 = require("./types/i18n");
/**
 * Encoder class for text processing
 * This class provides methods to trim text by removing stopwords, punctuation, and applying stemming.
 * It also handles special cases like code snippets and JSON blocks to preserve their integrity.
 * @class Encoder
 * @example
 * const encoder = new Encoder();
 * const trimmedText = encoder.trim("The quick brown fox jumps over the lazy dog.", { stemmer: 'porter', removeStopwords: true });
 */
class Encoder {
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
    trim(text, options = {}) {
        var _a;
        const { stemmer, language = 'english', removeSpaces = true, removeStopwords = true, removePunctuation = false, removeNewLines = false } = options;
        const protectedBlocks = [];
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
        if (removeNewLines) {
            text = text.replace(/[\r\n]+/g, ' ');
        }
        else {
            text = text.replace(/[\r\n]+/g, '<<br>>');
        }
        const tokenizer = new natural_1.default.WordTokenizer();
        let tokenized = tokenizer.tokenize(text);
        if (removePunctuation) {
            tokenized = tokenized.filter((word) => !i18n_1.PUNCTUATION.includes(word));
        }
        if (removeStopwords) {
            const stopwords = natural_1.default.stopwords;
            const wordsToExclude = new Set([...stopwords, ...(i18n_1.ARTICLES_PREPOSITIONS[language] || [])]);
            (_a = i18n_1.NEGATION_WORDS[language]) === null || _a === void 0 ? void 0 : _a.forEach((neg) => wordsToExclude.delete(neg));
            tokenized = tokenized.filter((word) => !wordsToExclude.has(word.toLowerCase()));
        }
        let words = tokenized;
        if (stemmer) {
            let stemmerInstance;
            if (stemmer === 'porter') {
                stemmerInstance = natural_1.default.PorterStemmer;
            }
            else if (stemmer === 'lancaster') {
                stemmerInstance = natural_1.default.LancasterStemmer;
            }
            else {
                throw new Error('Unsupported stemmer');
            }
            words = tokenized.map((word) => stemmerInstance.stem(word));
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
        // Replace <<br>> with actual new lines if not removing new lines
        if (!removeNewLines) {
            trimmed = trimmed.replace(/<<br>>/g, '\n');
        }
        return trimmed;
    }
}
exports.Encoder = Encoder;
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
function trim(text, options = {}) {
    const encoder = new Encoder();
    return encoder.trim(text, options);
}
