import { isValidElement, Fragment, ReactNode } from 'react';

// The string that separates the different phrase possibilities.
const DELIMETER = '||||';

const russianPluralGroups = (number: number) => {
  const lastTwo = number % 100;
  const end = lastTwo % 10;
  if (lastTwo !== 11 && end === 1) return 0;

  if (end >= 2 && end <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) return 1;
  return 2;
};

const PLURAL_TYPES = {
  arabic: (number: number) => {
    // http://www.arabeyes.org/Plural_Forms
    if (number < 3) return number;
    const lastTwo = number % 100;
    if (lastTwo >= 3 && lastTwo <= 10) return 3;
    return lastTwo >= 11 ? 4 : 5;
  },
  bosnian_serbian: russianPluralGroups,
  chinese: () => 0,
  croatian: russianPluralGroups,
  french: (number: number) => (number >= 2 ? 1 : 0),
  german: (number: number) => (number !== 1 ? 1 : 0),
  russian: russianPluralGroups,
  lithuanian: (number: number) => {
    const mod10 = number % 10;
    const mod100 = number % 100;
    if (mod10 === 1 && mod100 !== 11) return 0;
    return mod10 >= 2 && mod10 <= 9 && (mod100 < 11 || mod100 > 19) ? 1 : 2;
  },
  czech: (number: number) => {
    if (number === 1) return 0;
    return (number >= 2 && number <= 4) ? 1 : 2;
  },
  polish: (number: number) => {
    if (number === 1) return 0;
    const end = number % 10;
    return end >= 2 && end <= 4 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;
  },
  icelandic: (number: number) => ((number % 10 !== 1 || number % 100 === 11) ? 1 : 0),
  slovenian: (number: number) => {
    const lastTwo = number % 100;
    if (lastTwo === 1) return 0;
    if (lastTwo === 2) return 1;
    if (lastTwo === 3 || lastTwo === 4) return 2;
    return 3;
  },
  romanian: (number: number) => {
    if (number === 1) return 0;
    const lastTwo = number % 100;
    if (number === 0 || (lastTwo >= 2 && lastTwo <= 19)) return 1;
    return 2;
  },
};

const PLURAL_LOCALE_TYPES = {
  arabic: ['ar'],
  bosnian_serbian: ['bs-Latn-BA', 'bs-Cyrl-BA', 'srl-RS', 'sr-RS'],
  chinese: ['id', 'id-ID', 'ja', 'ko', 'ko-KR', 'lo', 'ms', 'th', 'th-TH', 'zh'],
  croatian: ['hr', 'hr-HR'],
  german: ['fa', 'da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hi-IN', 'hu', 'hu-HU', 'it', 'nl', 'no', 'pt', 'sv', 'tr'],
  french: ['fr', 'tl', 'pt-br'],
  russian: ['ru', 'ru-RU'],
  lithuanian: ['lt'],
  czech: ['cs', 'cs-CZ', 'sk'],
  polish: ['pl'],
  icelandic: ['is', 'mk'],
  slovenian: ['sl-SL'],
  romanian: ['ro'],
};

type PluralType = typeof PLURAL_TYPES;
type PluralTypeValue = PluralType[keyof PluralType];
type LocaleTypeKey = keyof typeof PLURAL_LOCALE_TYPES;

// Map locale types to pluralization functions.
const pluralizeMap = Object.keys(PLURAL_LOCALE_TYPES).reduce((acc, item) => {
  const key = item as LocaleTypeKey;
  const list = PLURAL_LOCALE_TYPES[key];
  list.forEach((locale) => {
    acc[locale] = PLURAL_TYPES[key];
  });
  return acc;
}, {} as Record<string, PluralTypeValue>);

// https://github.com/airbnb/polyglot.js/blob/master/index.js#L148
// Could probably be written as /(%\{(?:[a-zA-Z_]+)\})/
const REGEX_VARIABLE = /(%\{(?:.+?)\})/;

// Use in React environments only - returns an array of mixed strings/Fragment nodes
const translate = (
  activeLocale: string,
  phrase: string,
  substitutions?: number | Record<string, unknown>,
): string | undefined | ReactNode[] => {
  if (!activeLocale) throw new Error('Locale argument must always be provided');
  // If there is no key there is nothing to work with. Matching Polyglot behavior.
  if (!phrase) return undefined;
  if (!substitutions) return phrase;

  const options = typeof substitutions === 'number' ? { smart_count: substitutions } : substitutions;
  let result = phrase;

  // Select plural form: based on a phrase text that contains `n`
  // plural forms separated by `delimiter`, a `locale`, and a `substitutions.smart_count`,
  // choose the correct plural form. This is only done if `count` is set.
  if (phrase && typeof options.smart_count === 'number') {
    const localeType = activeLocale.split('-')[0];
    const variants = phrase.split(DELIMETER);
    const getIndex = pluralizeMap[localeType] || pluralizeMap.en;
    const index = getIndex(options.smart_count);

    result = (variants[index] || variants[0]).trim();
  }

  let hadJSX = false;
  const renderShard = (shard: string, index: number) => {
    // `shard` is either a variable WITH syntax '%{variableName}' or a part of the string
    // We could use a regex to extract `variableName` but this is 100x faster
    // Syntax is preserved to avoid false positive replacements when part of the string
    // is matching a substitution variable
    const item = options[shard.slice(2, -1)];
    if (!item) return shard;

    const isJSX = isValidElement(item);
    if (!isJSX) return String(item);

    hadJSX = true;
    return <Fragment key={`${shard}:${index}`}>{item}</Fragment>;
  };

  const content = result.split(REGEX_VARIABLE).map(renderShard);
  // If there were JSX replacements we must return an array of fragments
  if (hadJSX) return content;
  return content.join('');
};

export default translate;
