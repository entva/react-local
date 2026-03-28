import translate from './translate';

import type { TFunction, DictionaryValue } from './types';

export const parsePath = (path: string): string[] => path
  .replace(/\[(\d+)\]/g, '.$1')
  .replace(/\["([^"]+)"\]/g, '.$1')
  .replace(/\['([^']+)'\]/g, '.$1')
  .split('.')
  .filter(Boolean);

export const get = <T = unknown>(
  object: Record<string, unknown> | null | undefined,
  path: string,
  defaultValue?: T,
): T | undefined => {
  if (object == null) return defaultValue;
  let current: unknown = object;
  for (const key of parsePath(path)) {
    if (current == null || typeof current !== 'object') return defaultValue;
    current = (current as Record<string, unknown>)[key];
  }
  return current === undefined ? defaultValue : current as T;
};

export const getT = <T extends DictionaryValue>(active: string, dictionary: T) => {
  const lang = dictionary[active] as T[keyof T];

  const fn: TFunction = (key, options) => {
    const phrase = get<string>(lang, key)!;
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
