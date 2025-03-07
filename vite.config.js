import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/image-viewer/',
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'], // Auto-imports Vue functions like ref, computed, watch, etc.
      dts: 'src/auto-imports.d.ts', // Generates a TypeScript declaration file (optional)
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less'
        })
      ]
    }),
  ],
  optimizeDeps: {
    include: [
      'ant-design-vue',
      '@ant-design/icons-vue'
    ]
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '~': path.join(__dirname, 'node_modules')
    }
  }
})
