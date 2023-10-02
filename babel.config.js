module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@utils': './src/utils',
          '@views': './src/views',
          '@ui': './src/ui',
          '@api': './src/api',
          '@store': './src/store',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@src': './src',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
