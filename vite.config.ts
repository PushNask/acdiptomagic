import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
    strictPort: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    },
    hmr: {
      protocol: 'ws',
      clientPort: 8080,
      timeout: 5000,
      overlay: true,
      path: '/hmr/',
      // Add error handling for HMR
      onTimeout: () => {
        console.warn('HMR connection timeout, attempting to reconnect...');
      },
      reconnect: true
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