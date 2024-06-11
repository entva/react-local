/* eslint no-alert: "off" */
import T from './t';
import langFile from '../../.ladle/ladle.translations.json';

export default { title: 'T' };

export const WithTComponent = () => (
  <div>
    <dl>
      <dt>Simple string:</dt>
      <dd><T dictionary={langFile} phrase="text" /></dd>

      <dt>Nested string:</dt>
      <dd><T dictionary={langFile} phrase="nested.text" /></dd>

      <dt>Plural 0:</dt>
      <dd><T dictionary={langFile} phrase="pluralize" smartCount={0} /></dd>

      <dt>Plural 1:</dt>
      <dd><T dictionary={langFile} phrase="pluralize" smartCount={1} /></dd>

      <dt>Plural 2:</dt>
      <dd><T dictionary={langFile} phrase="pluralize" smartCount={2} /></dd>

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
);

WithTComponent.storyName = 'Simple component use';
