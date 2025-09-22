import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // разрешает доступ с других устройств в локальной сети
    port: 5173, // можно выбрать любой свободный порт
    strictPort: false, // если порт занят, выберет другой
  },
});
