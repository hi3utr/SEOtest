// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  // Standard prettier options
  singleQuote: true,
  semi: true,
  // Since prettier 3.0, manually specifying plugins is required
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  // This plugin's options
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '^@/.*$', // Project root imports
    '^#imports$',
    '^[.]', // relative imports
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
};
