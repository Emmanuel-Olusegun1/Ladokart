import { defineConfig,  loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default ({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    'process.env': env,
    'globalThis.env': env
  }
})
};
