module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        'react-native-reanimated/plugin',
      ],
      [
        "babel-plugin-root-import",
        {
          "paths": [
            {
              "rootPathSuffix": "./frontend/assets/images",
              "rootPathPrefix": "@images/"
            },
            {
              "rootPathSuffix": "./frontend/assets/styles",
              "rootPathPrefix": "@styles/"
            },
            {
              "rootPathSuffix": "./frontend/components",
              "rootPathPrefix": "@components/"
            },
            {
              "rootPathSuffix": "./frontend/screens",
              "rootPathPrefix": "@screens/"
            },
            {
              "rootPathSuffix": "./backend/api",
              "rootPathPrefix": "@api/"
            },
          ]
        },
      ],
    ],
  };
};
