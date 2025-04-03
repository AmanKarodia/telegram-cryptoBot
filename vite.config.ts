import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [
    react(),
    // Polyfill Node.js globals and modules for esbuild
    NodeGlobalsPolyfillPlugin({
      buffer: true,
    }),
    NodeModulesPolyfillPlugin(),
  ],
  resolve: {
    alias: {
      // Polyfill Buffer
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Define global and process for esbuild
      define: {
        global: 'globalThis',
        process: 'process',
      },
      // Inject polyfills for esbuild
      inject: [
        'node_modules/buffer/index.js',
        'node_modules/process/browser.js',
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Polyfill Node.js modules for Rollup
        rollupNodePolyFill(),
      ],
    },
  },
});
