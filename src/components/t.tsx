import type { ReactNode } from 'react';
import { useDictionary, useT } from '../hooks';
import type { DictionaryValue } from '../types';

type Props = {
  phrase: string,
  dictionary?: DictionaryValue,
  smartCount?: number,
  [key: string]: unknown,
};

const T = ({ phrase, dictionary, smartCount, ...props }: Props) => {
  const currentDictionary = useDictionary(dictionary);
  const t = useT(currentDictionary);
  const options = { ...props, smart_count: smartCount } as Record<string, ReactNode>;
  return t(phrase, options);
};

export default T;
