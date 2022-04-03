import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
