import type { Preview } from '@storybook/react';
import International from '../src';
import translations from './translations.json';

const data = { extraData: 'pass in extra data like date locales' };
const active = 'de-DE';

const preview: Preview = {
  decorators: [
    (Story) => (
      <International {...{ data, active }}>
        <Story />
      </International>
    ),
  ],
};

export default preview;
