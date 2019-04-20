/* Import rollup plugins */
import { terser } from 'rollup-plugin-terser'     // Js minifier
import resolve from 'rollup-plugin-node-resolve'  // Import from node_modules
import replace from 'rollup-plugin-replace'       // Replace
import commonjs from 'rollup-plugin-commonjs'     // Vue plugin dependency
import vue from 'rollup-plugin-vue'               // Vue loader
import postcss from 'rollup-plugin-postcss'       // Css loader and minifier
import atImport from 'postcss-import'             // Css import resolver
import serve from 'rollup-plugin-serve'           // Start a browser
import livereload from 'rollup-plugin-livereload' // Livereload

const production = !process.env.ROLLUP_WATCH


export default {
    input: 'src/index.js',
    output:  { file: 'dist/index.js', format: 'iife', sourcemap: 'inline' },
    watch:   { clearScreen: true },
    plugins: [
      resolve({jsnext: true, preferBuiltins: true, browser: true }),
      commonjs(),
      vue({css: false}),
      postcss({extract: true, minimize: production, plugins: [atImport({
        //filter: (name) => !name.startsWith('../onsenui'),
      })] }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.VUE_ENV': JSON.stringify('browser'),
      }),
      production && terser(),
      !production && serve('dist'),
      !production && livereload(),
    ],
}
