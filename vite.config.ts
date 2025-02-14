import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue2 from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      // Add any necessary preprocessor options here
    },
  },
});
