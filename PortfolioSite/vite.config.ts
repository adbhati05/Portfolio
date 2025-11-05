import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()],
    resolve: {
      // Essentially, every time I import a component or file under the src directory, I can use the alias "@" instead of writing out the full path.
      alias: {
        "@": path.resolve(__dirname, './src')
      },
    },
});
