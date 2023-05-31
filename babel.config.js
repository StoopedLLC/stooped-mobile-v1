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
              "rootPathSuffix": "./backend",
              "rootPathPrefix": "@backend/"
            },
            {
              "rootPathSuffix": "./backend/api",
              "rootPathPrefix": "@api/"
            }
          ]
        },
      ],
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ],
  };
};
