import { defineConfig } from 'tsup';

export default defineConfig({
  outDir: 'dist',
  clean: true,
  entry: ["src", "!src/tmp/**/**",],
});
