import translate from './translate';

type Translate = typeof translate;
type TranslateParameters = Parameters<Translate>;

export type TFunction = (
  phrase: TranslateParameters[1],
  substitutions?: TranslateParameters[2],
) => ReturnType<Translate>;

export type LocaleValue<T = unknown> = {
  active: string,
  data?: T,
};

type LanguageValue<T = unknown> = Record<string, T>;
export type DictionaryValue<T = unknown> = Record<string, LanguageValue<T>>;
