'use client';

import { type ReactNode, useMemo } from 'react';
import { DictionaryProvider } from '../context';
import type { DictionaryValue } from '../types';

type Props = {
  data: DictionaryValue,
  children: ReactNode,
};

const Dictionary = ({ data, children }: Props) => {
  const context = useMemo(() => data, [data]);
  return <DictionaryProvider value={context}>{children}</DictionaryProvider>;
};

export default Dictionary;
