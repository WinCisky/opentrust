import { resolve, dirname } from 'path'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

const _dirname = typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))

const root = resolve(_dirname, 'src')

export default defineConfig({
    base: '',
    root: root,
    build: {
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                review: resolve(root, 'review/index.html'),
                reviewit: resolve(root, 'review/it/index.html'),
                thanks: resolve(root, 'thanks/index.html'),
                thanksit: resolve(root, 'thanks/it/index.html'),
                privacy: resolve(root, 'privacy/index.html'),
            }
        },
        outDir: `${_dirname}/docs`,
        emptyOutDir: true
    }
})