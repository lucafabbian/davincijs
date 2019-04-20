/* Import rollup plugins */
import { terser } from 'rollup-plugin-terser'     // Js minifier
import resolve from 'rollup-plugin-node-resolve'  // Import from node_modules
import replace from 'rollup-plugin-replace'       // Replace values inside code
import commonjs from 'rollup-plugin-commonjs'     // Vue plugin dependency
import vue from 'rollup-plugin-vue'               // Vue loader
import postcss from 'rollup-plugin-postcss'       // Css loader and minifier
import postcssImport from 'postcss-import'        // Css import resolver
import postcssUrl    from 'postcss-url'           // Css icons inliner
import serve from 'rollup-plugin-serve'           // Start a browser
import livereload from 'rollup-plugin-livereload' // Livereload

/** Set development mode if is 'npm run watch' */
const production = !process.env.ROLLUP_WATCH;


export default {
    input: 'src/index.js',
    output:  { file: 'dist/index.js', format: 'iife' },
    watch:   { clearScreen: true },
    plugins: [
      resolve({jsnext: true, preferBuiltins: true, browser: true }),
      commonjs(),
      vue({css: false, template: {transformAssetUrls: false,} }),
      postcss({extract: true, minimize: production, plugins: [
        postcssImport({ filter: (name) => !name.startsWith('./static') }),
        postcssUrl   ({ url: 'inline'}),
      ] }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.VUE_ENV': JSON.stringify('browser'),
      }),
      production && terser(),       // Minify only on production
      !production && serve({         // Open browser on watch
        open: true,
        contentBase: 'dist',
        host: '0.0.0.0',
        port: 10001,
      }),
      !production && livereload(),  // Livereload on watch
    ],
}
