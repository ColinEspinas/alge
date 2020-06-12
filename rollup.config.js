import typescript from 'rollup-plugin-typescript2';
import execute from 'rollup-plugin-execute';
import pkg from './package.json';
import path from 'path';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.ts', // our source file
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'es', // the preferred format
        },
        {
            file: pkg.browser,
            format: 'umd',
            name: 'alge', // the global which can be used in a browser
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        typescript({
            typescript: require('typescript'),
        }),
        // terser(),
        execute(`mv ${path.join(process.cwd(), 'dist', 'index.d.ts')} ${path.join(process.cwd(), 'dist', 'alge.d.ts')}`)
        // copy({
        //     targets: [{ src: 'dist/index.d.ts', dest: 'dist/', rename: 'alge.d.ts' }]
        // })
    ]
};