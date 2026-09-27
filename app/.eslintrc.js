// Expo SDK 52 uses eslint-config-expo@8 (legacy eslintrc format).
module.exports = {
  extends: ['expo', 'prettier'],
  ignorePatterns: ['dist/*', 'node_modules/*', '.expo/*', 'android/*', 'ios/*'],
};
