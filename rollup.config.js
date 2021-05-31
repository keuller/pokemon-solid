import path from 'path';
import css from 'rollup-plugin-css-only';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import brotli from "rollup-plugin-brotli";

const extensions = ['.ts', '.tsx']
const production = process.env.NODE_ENV === 'production';

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'dev', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
    input: ['src/index.ts'],
    
    preserveEntrySignatures: false,
    
    treeshake: production,
    
    output: {
        sourcemap: !production ? 'inline' : false,
        dir: path.join(__dirname, 'public', 'dist'),
        format: 'es',
        name: 'app',
        chunkFileNames: '[name].[hash].mjs',
        entryFileNames: '[name].mjs',
        minifyInternalExports: production
    },

    plugins: [
        css({ output: 'bundle.css' }),

        nodeResolve({
            extensions,
            browser: true,
            dedupe: ['solid-js']
        }),

        babel({
          extensions,
          babelHelpers: 'bundled',
          presets: [
            'solid',
            '@babel/preset-typescript',
          ],
          exclude: /node_modules\//,
        }),

        commonjs({
            extensions,
        }),

        replace({
            preventAssignment: true,
            values: {
                'process.env.PUBLIC_URL': production ? '"YOUR_SITE_URL"' : '"localhost:3000"',
            },
        }),

        alias({
            entries: [{ find: '@', replacement: path.join(__dirname, 'src') }],
        }),

        !production && serve(),

        !production && livereload({
            watch: './public/dist',
        }),

        production && terser({
            toplevel: true,
            compress: true,
            module: true,
            format: {
                comments: false,
                ecma: 2020,
            },
        }),

        production && brotli({
            test: /\.(js|mjs|css|json|svg|ico|html|xml)$/,
        })
    ],

    watch: {
        clearScreen: true,
        exclude: ['node_modules'],
    },
}
