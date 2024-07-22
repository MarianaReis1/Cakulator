import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import path from 'path';

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: '~/styles/custom.sass'
    })
  ],
  test: {
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
    }
  },
});

