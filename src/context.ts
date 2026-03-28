import { createContext } from 'react';
import type { LocaleValue, DictionaryValue } from './types';

export const LocaleContext = createContext<LocaleValue>({ active: 'en-US' });
export const { Consumer: LocaleConsumer, Provider: LocaleProvider } = LocaleContext;

export const DictionaryContext = createContext<DictionaryValue>({});
export const { Consumer: DictionaryConsumer, Provider: DictionaryProvider } = DictionaryContext;
