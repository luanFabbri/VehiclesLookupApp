module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@services': './src/services',
          '@api': './src/services/API',
          '@i18n': './src/services/i18n',
          '@navigation': './src/navigation',
          '@interfaces': './src/interfaces',
          '@components': './src/components',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
