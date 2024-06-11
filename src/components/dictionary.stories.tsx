/* eslint no-alert: "off" */
import type { ReactNode } from 'react';
import T from './t';
import Dictionary from './dictionary';
import { useT } from '../hooks';
import langFile from '../../.ladle/ladle.translations.json';


export default { title: 'Dictionary' };

const WrapInDictionary = ({ children }: { children: ReactNode }) => (
  <Dictionary data={langFile}>
    {children}
  </Dictionary>
);

export const WithDictionaryProvider = () => (
  <WrapInDictionary>
    <div>
      <dl>
        <dt>Simple string:</dt>
        <dd><T phrase="text" /></dd>

        <dt>Nested string:</dt>
        <dd><T phrase="nested.text" /></dd>

        <dt>Plural 0:</dt>
        <dd><T phrase="pluralize" smartCount={0} /></dd>

        <dt>Plural 1:</dt>
        <dd><T phrase="pluralize" smartCount={1} /></dd>

        <dt>Plural 2:</dt>
        <dd><T phrase="pluralize" smartCount={2} /></dd>

        <dt>Substitutions:</dt>
        <dd>
          <T
            dictionary={langFile}
            phrase="substitution"
            variable_1={<strong onClick={() => alert('🍬')}>bubblegum</strong>}
            variable_2={<em onClick={() => alert('🍑')}>ass</em>}
          />
        </dd>
      </dl>
    </div>
  </WrapInDictionary>
);

WithDictionaryProvider.storyName = 'Using dictionary provider with T component';

const WithTHook = () => {
  const t = useT();

  return (
    <div>
      <dl>
        <dt>Simple string:</dt>
        <dd>{t('text')}</dd>

        <dt>Nested string:</dt>
        <dd>{t('nested.text')}</dd>

        <dt>Plural 0:</dt>
        <dd>{t('pluralize', 0)}</dd>

        <dt>Plural 1:</dt>
        <dd>{t('pluralize', 1)}</dd>

        <dt>Plural 2:</dt>
        <dd>{t('pluralize', 2)}</dd>

        <dt>Substitutions:</dt>
        <dd>
          {t('substitution', {
            variable_1: <strong onClick={() => alert('🍬')}>bubblegum</strong>,
            variable_2: <em onClick={() => alert('🍑')}>ass</em>,
          })}
        </dd>
      </dl>
    </div>
  );
};

export const WrappedWithTHook = () => (
  <WrapInDictionary>
    <WithTHook />
  </WrapInDictionary>
);

WrappedWithTHook.storyName = 'Using dictionary provider with useT hook';
