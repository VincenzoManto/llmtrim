"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUNCTUATION = exports.ARTICLES_PREPOSITIONS = exports.NEGATION_WORDS = void 0;
exports.NEGATION_WORDS = {
    english: [
        'no', 'nor', 'not', 'don', 'dont', 'ain', 'aren', 'arent', 'couldn', 'couldnt',
        'didn', 'didnt', 'doesn', 'doesnt', 'hadn', 'hadnt', 'hasn', 'hasnt',
        'haven', 'havent', 'isn', 'isnt', 'mightn', 'mightnt', 'mustn', 'mustnt',
        'needn', 'neednt', 'shan', 'shant', 'shouldn', 'shouldnt', 'wasn', 'wasnt',
        'weren', 'werent', 'won', 'wont', 'wouldn', 'wouldnt', 'never', 'none', 'nobody', 'nothing', 'nowhere'
    ],
    french: [
        'non', 'ne', 'pas', 'n', 'ni', 'aucun', 'jamais', 'rien', 'personne', 'nul', 'nulle part', 'guère', 'sans'
    ],
    german: [
        'kein', 'keine', 'keiner', 'keines', 'keinem', 'keinen', 'nicht', 'nichts', 'niemals', 'nie', 'ohne', 'weder', 'niemand', 'nirgendwo'
    ],
    spanish: [
        'no', 'nada', 'ningún', 'ninguna', 'ninguno', 'nunca', 'jamás', 'nadie', 'tampoco', 'sin'
    ],
    italian: [
        'no', 'niente', 'nessuno', 'mai', 'non', 'nulla', 'neanche', 'nemmeno', 'senza'
    ],
    portuguese: [
        'não', 'nada', 'nenhum', 'nenhuma', 'nunca', 'jamais', 'ninguém', 'tampouco', 'sem'
    ],
    russian: [
        'нет', 'не', 'ничего', 'никто', 'никогда', 'нигде', 'никакой', 'никакая', 'никакое', 'никакие', 'без'
    ],
    chinese: [
        '不', '没有', '无', '非', '未', '没人', '没有人', '一点也不', '绝不', '从不', '从来没有', '毫无', '没有什么'
    ],
    japanese: [
        'いいえ', 'ない', '何も', '誰も', '決して', '全く', '一切', 'どこも', 'ありえない', '未だに', '無い'
    ],
    korean: [
        '아니요', '없다', '아니다', '무', '결코', '안', '전혀', '누구도', '아무도', '절대', '없어요', '없습니다'
    ],
    arabic: [
        'لا', 'ليس', 'لا شيء', 'لا أحد', 'أبدا', 'مستحيل', 'بدون', 'ما', 'لم', 'لن', 'غير', 'أياً', 'قط'
    ],
    hindi: [
        'नहीं', 'न', 'कुछ नहीं', 'कोई नहीं', 'कभी नहीं', 'ना', 'बिलकुल नहीं', 'कहीं नहीं', 'निजात', 'अभी नहीं'
    ],
    turkish: [
        'hayır', 'değil', 'hiçbir', 'hiçbir şey', 'kimse', 'asla', 'yok', 'olmaz', 'hiç', 'hiç kimse', 'sakın', 'olmayan'
    ],
    dutch: [
        'nee', 'niet', 'niets', 'nooit', 'geen', 'nergens', 'niemand', 'zonder', 'noch'
    ],
    polish: [
        'nie', 'nic', 'nikt', 'nigdy', 'żaden', 'żadna', 'żadne', 'bez', 'wcale', 'nigdzie', 'nikt nie'
    ]
};
exports.ARTICLES_PREPOSITIONS = {
    english: ['the', 'a', 'an', 'in', 'on', 'at', 'for', 'to', 'of'],
    french: ['le', 'la', 'les', 'un', 'une', 'des', 'dans', 'sur', 'à', 'pour'],
    german: ['der', 'die', 'das', 'ein', 'eine', 'den', 'dem', 'des'],
    spanish: ['el', 'la', 'los', 'las', 'un', 'una'],
    italian: ['il', 'la', 'lo', 'i', 'gli'],
    portuguese: ['o', 'a', 'os', 'as'],
    russian: ['в', 'на'],
    chinese: ['的'],
    japanese: ['の'],
    korean: ['의'],
    arabic: ['ال'],
    hindi: ['का'],
    turkish: ['bir'],
    dutch: ['de', 'het'],
    polish: ['w']
};
exports.PUNCTUATION = ['.', ',', "'", '"', '!', '?', ';', ':', '-', '…', '—'];
