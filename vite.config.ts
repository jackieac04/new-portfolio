import { defineConfig } from "vite";
// import reactRefresh from "@vitejs/plugin-react-refresh";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  build: {
    chunkSizeWarningLimit: 100,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
  
      plugins: [
          tailwindcss(),
      ],
    

});

