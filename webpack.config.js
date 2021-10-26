import path from "path";
import webpack from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const IS_PROD = process.env.APP_ENV === "production";

export default {
  mode: IS_PROD ? "production" : "development",

  name: IS_PROD ? "Public Pages" : "Local Overrides",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js", ".css"],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.APP_ENV": JSON.stringify(process.env.APP_ENV),
    }),
  ],

  optimization: {
    chunkIds: "named",
    runtimeChunk: "single",
    usedExports: true,
  },

  entry: {
    "global-v1": {
      import: "./src/global.ts",
    },
    "login-v2": {
      import: "./src/login.ts",
    },
  },

  output: {
    path: path.resolve(process.cwd(), "public/scripts/"),
  },
};
