import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

const isSsrBuild = process.argv.includes("--ssr");

export default defineConfig(() => ({
  plugins: [solid({ ssr: isSsrBuild })],
  build: {
    target: "esnext",
  },
}));
