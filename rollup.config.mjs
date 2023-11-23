import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/cjs/index.js',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    resolve(),
    babel({
      babelHelpers: 'bundled',
    }),
    commonjs(),
    peerDepsExternal(),
  ],
};
