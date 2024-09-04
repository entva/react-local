import { useLocaleData, useT, useTranslate } from '../hooks';
import langFile from '../../.ladle/ladle.translations.json';

export default { title: 'International' };

export const WithTHook = () => {
  const t = useT(langFile);

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
            variable_1: 'bubblegum',
            variable_2: 'ass',
          })}
        </dd>

        <dt>Quote:</dt>
        <dd>{t('quoted', { quote: 'I like turtles (c) Albert Einstein' })}</dd>
      </dl>
    </div>
  );
};

WithTHook.storyName = 'Using t hook';

type LangFileType = typeof langFile;

export const WithTranslateHook = () => {
  const [lang, t] = useTranslate<LangFileType>(langFile);

  return (
    <div>
      <dl>
        <dt>Simple string:</dt>
        <dd>{t(lang.text)}</dd>

        <dt>Nested string:</dt>
        <dd>{t(lang.nested.text)}</dd>

        <dt>Plural 0:</dt>
        <dd>{t(lang.pluralize, 0)}</dd>

        <dt>Plural 1:</dt>
        <dd>{t(lang.pluralize, 1)}</dd>

        <dt>Plural 2:</dt>
        <dd>{t(lang.pluralize, 2)}</dd>

        <dt>Substitutions:</dt>
        <dd>
          {t(lang.substitution, {
            variable_1: 'bubblegum',
            variable_2: 'ass',
          })}
        </dd>

        <dt>Quote:</dt>
        <dd>{t(lang.quoted, { quote: 'I like turtles (c) Albert Einstein' })}</dd>
      </dl>
    </div>
  );
};

WithTranslateHook.storyName = 'Using translate hook';


export const WithLocaleHook = () => {
  const locale = useLocaleData();

  return (
    <pre>
      locale:
      {JSON.stringify(locale, null, 2)}
    </pre>
  );
};

WithLocaleHook.storyName = 'Retrieving locale data';
