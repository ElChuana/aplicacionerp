import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Ignorar archivos generados y artefactos de build para evitar falsos positivos del linter
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      "public/**",
      // Código generado por Prisma (JS/TS) y runtime
      "src/generated/**",
      "src/generated/prisma/**",
      // Esquemas o migraciones que no deben lintarse
      "prisma/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Reglas del proyecto (relajar algunas para acelerar la estabilización)
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "prefer-const": "warn",
      "react/no-unescaped-entities": "warn",
      "react-hooks/exhaustive-deps": "warn",
      // Patrón habitual en prisma singleton
      "no-var": "off",
    },
  },
  // Excepción explícita para el singleton de Prisma
  {
    files: ["lib/prisma.ts"],
    rules: {
      "no-var": "off",
    },
  },
];
