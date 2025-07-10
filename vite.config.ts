import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    tsconfigPaths()          
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),   
    },
  },
  esbuild: {
    legalComments: 'none',
  },
});
