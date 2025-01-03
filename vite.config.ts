import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Listen on all addresses
    port: 8080,
    strictPort: true,
    cors: true, // Enable CORS
    hmr: {
      clientPort: 443, // Force client to use HTTPS port
      host: `cc0ca1fd-d388-4ca9-b3c3-e7409e536f14.lovableproject.com`
    }
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