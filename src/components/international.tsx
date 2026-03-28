'use client';

import { useMemo, type ReactNode } from 'react';
import { LocaleProvider } from '../context';

type Props = {
  active: string,
  children: ReactNode,
  data?: unknown,
};

const International = ({ active, data, children }: Props) => {
  const context = useMemo(() => ({ active, data }), [active, data]);
  return <LocaleProvider value={context}>{children}</LocaleProvider>;
};

export default International;
