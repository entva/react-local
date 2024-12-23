import baseConf from 'eslint-config-entva-typescript';

export default [
  ...baseConf,
  {
    ignores: ['lib/'],
  },
];
