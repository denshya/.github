import path from "path"
import { defineConfig, Plugin } from "vite"



function generateBundleMap(): Plugin {
  const source = {
    entries: {},
    modules: {},
    assets: {}
  }

  return {
    name: "BundleMap",
    generateBundle(options, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type === "chunk") {
          if (output.isEntry === false) {
            source.modules[output.name] = {
              fileName: output.fileName,
              imports: [...new Set([...output.imports, ...output.dynamicImports])],
            }
          } else {
            source.entries[output.name] = {
              fileName: output.fileName,
              imports: [...new Set([...output.imports, ...output.dynamicImports])],
            }
          }
        }

        if (output.type === "asset") {
          if (output.originalFileNames.length > 0) {
            source.assets[output.fileName] = output.originalFileNames
          }
        }
      }

      // @ts-expect-error deprecated fields.
      bundle["bundle.json.map"] = {
        fileName: "bundle.json.map",
        names: [],
        originalFileNames: [],
        source: JSON.stringify(source),
        type: "asset",
        needsCodeReference: false,
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [generateBundleMap()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0"
  },
  build: {
    outDir: "build",

    sourcemap: true,
    emptyOutDir: true,
    modulePreload: false,

    emitAssets: true,
    assetsInlineLimit: 0,

    // ssr: true,
    ssrEmitAssets: true,
    rollupOptions: {
      input: {
        index: "./index.html",
        essential: "./src/essential.ts",
      },
      preserveEntrySignatures: "exports-only"
    }
  },
  esbuild: {
    keepNames: false,
    supported: {
      // https://stackoverflow.com/questions/72618944/get-error-to-build-my-project-in-vite-top-level-await-is-not-available-in-the
      "top-level-await": true
    },
  },
})
