export interface TrimOptions {
  stemmer?: 'porter' | 'lancaster';
  language?: 'english';
  removeSpaces?: boolean;
  removeStopwords?: boolean;
  removePunctuation?: boolean;
}