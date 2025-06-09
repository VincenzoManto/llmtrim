"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoder = void 0;
const natural_1 = __importDefault(require("natural"));
const i18n_1 = require("./types/i18n");
class Decoder {
    detrim(text, options) {
        var _a;
        const { stemmer, language = 'english', removeSpaces = true, removeStopwords = true, removePunctuation = false } = options;
        // Merge contractions
        text = text.replace(/['’]/g, '');
        // Tokenize
        const tokenizer = new natural_1.default.WordTokenizer();
        let tokenized = tokenizer.tokenize(text);
        // Remove punctuation
        if (removePunctuation) {
            tokenized = tokenized.filter((word) => !i18n_1.PUNCTUATION.includes(word));
        }
        // Remove stopwords
        if (removeStopwords) {
            const stopwords = natural_1.default.stopwords;
            const wordsToExclude = new Set([...stopwords, ...(i18n_1.ARTICLES_PREPOSITIONS[language] || [])]);
            (_a = i18n_1.NEGATION_WORDS[language]) === null || _a === void 0 ? void 0 : _a.forEach((neg) => wordsToExclude.delete(neg));
            tokenized = tokenized.filter((word) => !wordsToExclude.has(word.toLowerCase()));
        }
        // Stemming
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
        // Remove spaces
        const joinStr = removeSpaces ? '' : ' ';
        let trimmed = words.join(joinStr).trim();
        if (!removePunctuation) {
            trimmed = trimmed.replace(/\s([?.!,:;])/g, '$1');
        }
        return trimmed;
    }
}
exports.Decoder = Decoder;
