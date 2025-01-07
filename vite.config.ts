import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
    strictPort: true,
    cors: true,
    hmr: {
      clientPort: 443,
      protocol: 'wss',
      path: '/',
      timeout: 30000,
      overlay: true
    }
  },
  preview: {
    port: 8080,
    strictPort: true,
    host: true,
    cors: true
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));