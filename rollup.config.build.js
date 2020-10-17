// import minify from 'rollup-plugin-babel-minify';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: './src/js/ERNO.js',
  plugins: [
    nodeResolve(),
    // minify({ comments: false, sourceMap: true }),
  ],
  output: {
    format: 'cjs',
    file: '../react-app/public/assets/js/ERNO.js',
    indent: '\t',
    sourcemap: false,
  },
};
