import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8000,
        host: "localhost",
    proxy: {
      '/api': {
           target: 'http://localhost:1234',
           changeOrigin: true,
           secure: false,      
           ws: true,
       }
  },
    },
    plugins: [react()],
});
