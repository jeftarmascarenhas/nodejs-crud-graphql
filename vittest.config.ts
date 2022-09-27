import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 2000,
    setupFiles: [],
    coverage: {
      reporter: ["text", "html"],
    },
    globals: true,
  },
});
