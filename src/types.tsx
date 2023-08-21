import type { ReactNode } from 'react';

export type TFunction = (
  phrase: string,
  substitutions?: Record<string, ReactNode> | number,
) => ReactNode;

export type LocaleValue<T = unknown> = {
  active: string,
  data?: T,
};

type LanguageValue<T = unknown> = Record<string, T>;
export type DictionaryValue<T = unknown> = Record<string, LanguageValue<T>>;
