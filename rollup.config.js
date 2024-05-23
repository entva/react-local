import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import { preserveDirective } from 'rollup-preserve-directives';

const plugins = [
  peerDepsExternal(),
  typescript({ tsconfig: './tsconfig.build.json' }),
  babel({ exclude: /node_modules/, babelHelpers: 'runtime' }),
  resolve({ browser: true, extensions: ['.js', '.jsx', '.json'] }),
  commonjs({ extensions: ['.js', '.jsx', '.json'] }),
];

export default [
  {
    plugins: [del({ targets: 'lib/*' }), ...plugins],
    input: 'src/server.tsx',
    output: [
      {
        file: 'lib/server.esm.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'lib/server.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named', // Disable warning for default imports
      },
    ],
  },
  {
    plugins: [preserveDirective(), ...plugins],
    input: 'src/index.tsx',
    output: [
      {
        file: 'lib/index.esm.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'lib/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named', // Disable warning for default imports
      },
    ],
  },
];
