![Compression](https://img.shields.io/badge/Max_Compression_Achieved-−62%25-brightgreen)
 ![Tested](https://img.shields.io/badge/Tests_Passed-100%25-brightgreen)
 ![Tokens](https://img.shields.io/badge/Max_Tokens_Reduced-−67%25-brightgreen)
         






[![npm](https://img.shields.io/npm/v/llmtrim)](https://www.npmjs.com/package/llmtrim)
[![npm](https://img.shields.io/npm/dt/llmtrim)](https://www.npmjs.com/package/llmtrim)
![GitHub license](https://img.shields.io/github/license/VincenzoManto/llmtrim)


# LLMTrim 

A library for trimming tokens in encoding and decoding in LLM (Large Language Model) applications.  
It provides utilities to compress text by removing stopwords, punctuation, spaces, and applying stemming, with the ability to reverse the process as much as possible.

---

## Features

- **Token trimming**: Remove stopwords, punctuation, and spaces from text.
- **Stemming**: Supports Porter and Lancaster stemmers via [natural](https://www.npmjs.com/package/natural).
- **Negation preservation**: Keeps negation words even when removing stopwords.
- **Customizable**: Options for language, stemming, and what to remove.
- **Decoder**: Attempts to reconstruct trimmed text.

---

## Installation

```sh
npm install llmtrim
```

## Usage
#### Encoder

```javascript
import { Encoder } from 'llmtrim';

const encoder = new Encoder();
const text = "The quick brown fox jumps over the lazy dog.";
const trimmed = encoder.trim(text, {
  removeSpaces: true,
  removeStopwords: true,
  removePunctuation: true,
  stemmer: 'porter'
});
console.log(trimmed); // Output: quickbrownfoxjumpsoverlazydog
```

#### Decoder

```javascript
import { Decoder } from 'llmtrim';

const decoder = new Decoder();
const original = decoder.detrim(trimmed, {
  removeSpaces: true,
  removeStopwords: true,
  removePunctuation: true,
  stemmer: 'porter'
});
console.log(original);
// Output: The quick brown fox jumps over the lazy dog.
``` 

## Options
| Option              | Type                                 | Description                                                                                 |
|---------------------|--------------------------------------|---------------------------------------------------------------------------------------------|
| `stemmer`           | `'porter'` \| `'lancaster'`          | Selects the stemming algorithm to use.                                                      |
| `language`          | `'english'`                          | Sets the language for stopword removal (currently only English is supported).               |
| `removeSpaces`      | `boolean`                            | If `true`, removes all spaces from the text.                                                |
| `removeStopwords`   | `boolean`                            | If `true`, removes common stopwords (e.g., "the", "and") from the text.                     |
| `removePunctuation` | `boolean`                            | If `true`, removes punctuation characters from the text.                                    |

## Testing

Run the tests using:

```sh
npm test
```
## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.