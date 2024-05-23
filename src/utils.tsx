import get from 'lodash.get';
import translate from './translate';

import type { TFunction, DictionaryValue } from './types';

export const getT = <T extends DictionaryValue>(active: string, dictionary: T) => {
  const lang = dictionary[active] as T[keyof T];

  const fn: TFunction = (key, options) => {
    const phrase = get(lang, key) as string;
    return translate(active, phrase, options);
  };

  return fn;
};

export const getTranslate = <T extends DictionaryValue>(active: string, dictionary: T) => {
  const lang = dictionary[active] as T[keyof T];

  const fn: TFunction = (phrase, options) => (
    translate(active, phrase, options)
  );

  return [lang, fn] as const;
};
