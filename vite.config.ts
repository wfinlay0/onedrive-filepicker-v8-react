import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/index.ts"),
      name: "OneDriveFilePickeV8",
      fileName: `onedrive-filepicker-v8-react`,
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  server: {
    // these need to stay on because the redirect uri will be specified in the azure app registration
    port: 3000,
    strictPort: true,
    open: true,
  },
});
