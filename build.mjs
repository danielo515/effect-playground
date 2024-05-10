import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "url";
import { build } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const extScripts = [
  {
    entry: path.resolve(__dirname, "src/rpc-client.ts"),
    fileName: "rpc-client",
  },
];

extScripts.forEach(async (scr) => {
  await build({
    plugins: [
      tsconfigPaths(),
      visualizer({
        template: "treemap", // or sunburst
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: `${scr.fileName}.html`,
      }),
    ],
    build: {
      sourcemap: false,
      outDir: "./dist",
      lib: {
        ...scr,
        formats: ["es"],
      },
      emptyOutDir: false,
    },
    configFile: false,
  });
});
