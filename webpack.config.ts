import * as Path from "path";
import Webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: Webpack.Configuration = {
    mode: "development",
    devServer: {
        host: "0.0.0.0",
        port: 9000,
        hot: true,
    },
    devtool: "source-map",
    resolve: {
        extensions: [
            ".tsx",
            ".ts",
            ".jsx",
            ".js",
        ],
        alias: {
            "@": Path.resolve("src"),
        },
    },
    output: {
        
        path: Path.resolve("dist"),
    },
    entry: {
        index: Path.resolve("src/frontend/index.tsx"),
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader" },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: Path.resolve("src/frontend/index.html"),
        }),
    ],
};

export default config;
