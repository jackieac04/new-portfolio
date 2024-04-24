import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
// import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [reactRefresh()],
});
