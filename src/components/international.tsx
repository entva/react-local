import { useMemo, type ReactNode } from 'react';
import { LocaleProvider } from '../context';

type Props<T = unknown> = {
  active: string,
  children: ReactNode,
  data?: T,
};

const International = <T = unknown>({ active, data, children }: Props<T>) => {
  const context = useMemo(() => ({ active, data }), [active, data]);
  return <LocaleProvider value={context}>{children}</LocaleProvider>;
};

export default International;
