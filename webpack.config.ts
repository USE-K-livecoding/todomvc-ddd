import * as Path from "path";
import * as FS from "fs";
import Webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const alias = FS.readdirSync(Path.resolve("src")).reduce(
    (initial, name) => {
        initial[`@/${name}`] = Path.resolve("src", name);
        return initial;
    },
    {} as Record<string, string>
);

const config: Webpack.Configuration = {
    mode: "development",
    target: "web",
    devServer: {
        // contentBase: Path.resolve("dist"),
        // watchContentBase: true,
        host: "0.0.0.0",
        port: 9000,
        hot: true,
        inline: true,
    },
    devtool: "source-map",
    resolve: {
        extensions: [
            ".tsx",
            ".ts",
            ".jsx",
            ".js",
        ],
        alias,
    },
    output: {
        path: Path.resolve("dist"),
        // publicPath: Path.resolve("/"),
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
        new Webpack.HotModuleReplacementPlugin(),
    ],
};

export default config;
