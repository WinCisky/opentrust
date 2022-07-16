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
                mail: resolve(root, 'mail/index.html'),
                mailcheck: resolve(root, 'mailcheck/index.html'),
                login: resolve(root, 'login/index.html'),
                customer: resolve(root, 'customer/index.html'),
            }
        },
        outDir: `${_dirname}/dist`,
        emptyOutDir: true
    }
})