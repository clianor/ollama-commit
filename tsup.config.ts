import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: {
    index: "./src/index.ts",
  },
  outExtension() {
    return {
      js: ".cjs",
    };
  },
  outDir: "dist",
  format: ["cjs"],
  clean: true,
  sourcemap: false,
  minify: !options.watch,
  target: "node16",
  dts: false,
}));
