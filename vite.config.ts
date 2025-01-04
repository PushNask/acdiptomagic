import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Listen on all addresses
    port: 8080,
    strictPort: true,
    cors: {
      origin: "*", // Be more restrictive in production
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    },
    hmr: {
      protocol: 'wss',
      clientPort: 443,
      host: `cc0ca1fd-d388-4ca9-b3c3-e7409e536f14.lovableproject.com`
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