import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';
import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'bundled',
      }),
      resolve(),
      json(),
      terser(),
    ],
  },
  {
    input: './src/index.ts',
    output: [{ file: 'dist/types.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
