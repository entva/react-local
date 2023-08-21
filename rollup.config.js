import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';

export default {
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
  plugins: [
    del({ targets: 'lib/*' }),
    peerDepsExternal(),
    typescript(),
    babel({ exclude: /node_modules/, babelHelpers: 'runtime' }),
    resolve({ browser: true, extensions: ['.js', '.jsx', '.json'] }),
    commonjs({ extensions: ['.js', '.jsx', '.json'] }),
  ],
};
