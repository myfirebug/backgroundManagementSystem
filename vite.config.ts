import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const resolve = (p: string) => path.resolve(__dirname, p);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": resolve("./src"),
      "@assets": resolve("./src/assets"),
      "@components": resolve("./src/components"),
      "@pages": resolve("./src/pages"),
      "@router": resolve("./src/router"),
      "@service": resolve("./src/service"),
      "@store": resolve("./src/store"),
      "@utils": resolve("./src/utils"),
    },
  },
});
