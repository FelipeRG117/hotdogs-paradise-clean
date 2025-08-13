const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Opcional: si usas archivos CSS/SCSS en tus tests
  modulePathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/.next"],
  // Opcional: para que Jest entienda los archivos que testeas
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};
