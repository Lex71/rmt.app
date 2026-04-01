import { configDefaults, defineConfig } from "vitest/config";
// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    css: true,
    setupFiles: "./vitest.setup.ts",
    exclude: [...configDefaults.exclude, "**/e2e/**"], // Example: Exclude e2e tests
    coverage: {
      provider: "v8", // Use Vite's default coverage provider
      reporter: ["text", "json", "html"],
    },
  },
});
