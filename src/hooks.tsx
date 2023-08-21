import { useCallback, useContext } from 'react';
import get from 'lodash.get';
import translate from './translate';

import type { TFunction, DictionaryValue } from './types';
import { LocaleContext, DictionaryContext } from './context';

const useLocaleContext = () => useContext(LocaleContext);
export const useDictionaryContext = () => useContext(DictionaryContext);

export const useDictionary = <T extends DictionaryValue>(dictionary?: T) => {
  const contextValue = useDictionaryContext();
  return (dictionary || contextValue || {}) as T;
};

export const useLocaleData = <T = unknown>() => useContext(LocaleContext).data as T;

export const useT = <T extends DictionaryValue>(dictionary?: T) => {
  const currentDictionary = useDictionary(dictionary);
  const { active } = useLocaleContext();
  const lang = currentDictionary[active] as T[keyof T];

  const fn: TFunction = useCallback((key, options) => {
    const phrase = get(lang, key) as string;
    return translate(active, phrase, options);
  }, [active, lang]);

  return fn;
};

export const useTranslate = <T extends DictionaryValue>(dictionary: T) => {
  const { active } = useLocaleContext();
  const lang = dictionary[active] as T[keyof T];

  const fn: TFunction = useCallback((phrase, options) => (
    translate(active, phrase, options)
  ), [active]);

  return [lang, fn] as const;
};
