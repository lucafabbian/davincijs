/* Import rollup plugins */
import { terser } from 'rollup-plugin-terser'     // Js minifier
import globImport from 'rollup-plugin-glob-import'// Resolve glob inside imports
import resolve from 'rollup-plugin-node-resolve'  // Import from node_modules
import replace from 'rollup-plugin-replace'       // Replace values inside code
import commonjs from 'rollup-plugin-commonjs'     // Vue plugin dependency
import vue from 'rollup-plugin-vue'               // Vue loader
import postcss from 'rollup-plugin-postcss'       // Css loader and minifier
import postcssImport from 'postcss-import'        // Css import resolver
import postcssUrl    from 'postcss-url'           // Css icons inliner
import serve from 'rollup-plugin-serve'           // Start a browser
import livereload from 'rollup-plugin-livereload' // Livereload

/** Set production mode if is 'npm run build' and not 'npm run watch'*/
const production = !process.env.ROLLUP_WATCH;

/**
 *  Configurazione di default di rollup:
 *  partendo dal file src/index.js, concatena e ottimizza tutti gli
 *  script e i css in due file, dist/index.js e dist/index.css
 *  Si occupa anche della compilazione dei file .vue e di caricare
 *  le dipendenze quali Vue e Onsen da node_modules.
 *  Gli import che iniziano con ./static vengono ignorati (rappresentano
 *  file che non vanno compilati e sono già presenti in dist)
 *
 *  Uso:
 *  - npm run build   # Crea una versione compatta ed efficiente, da release
 *  - npm run watch   # Non minimizza i file e ricompila a ogni salvataggio (dev mode)
 */
export default {
    input: 'src/index.js',
    output:  {
      file: production ? 'dist/index.min.js':'dist/index.js',
      format: 'iife'
    },
    watch:   { clearScreen: true },
    plugins: [
      globImport({format: 'default'}),
      // Prende i moduli da node
      resolve({jsnext: true, preferBuiltins: true, browser: true }),
      commonjs(),
      // Compila vue
      vue({css: false, template: {transformAssetUrls: false,} }),
      // Compila i css
      postcss({extract: true, minimize: production, plugins: [
        postcssImport({ filter: (name) => !name.startsWith('./static') }),
        postcssUrl   ({ url: 'inline'}),
      ] }),
      // Mette delle variabili d'ambiente
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.VUE_ENV': JSON.stringify('browser'),
      }),
      // Minifica i js
      production && terser(),       // Minify only on production
      // Apre un server alla porta :10001 + livereload
      !production && serve({         // Open browser on watch
        open: true,
        contentBase: '../',
         openPage: '/davincijs/dist/debug.html',
        host: 'localhost',
        port: 10001,
      }),
      !production && livereload(),  // Livereload on watch
    ],
}
