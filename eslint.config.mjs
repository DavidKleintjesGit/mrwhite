import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // The native projects are generated, and they carry a copy of the built
    // web bundle. Linting minified output buries real findings in thousands
    // of warnings.
    "android/**",
    "ios/**",
  ]),
]);

export default eslintConfig;
