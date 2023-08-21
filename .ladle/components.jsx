import International from '../src';

const data = { extraData: 'pass in extra data like date locales' };
const active = 'de-DE';

export const Provider = ({ children }) => (
  <International {...{ data, active }}>
    {children}
  </International>
);
