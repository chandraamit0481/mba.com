const webpack = require('webpack');
const path = require('path');
const assetsPlugin = require('assets-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const prod = process.argv.indexOf('-p') !== -1;
process.env.NODE_ENV = "dev";

var pluginToLoad = [];
pluginToLoad.push(new assetsPlugin({
    fullPath: true,
    filename: 'webpack.assets.json',
    prettyPrint: true
}));
pluginToLoad.push(new cleanWebpackPlugin(['dist/*.*'], {
    root: path.resolve('./angular'),
    verbose: true,
    dry:false
}));
    
if (prod) {
    pluginToLoad.push(new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }));
    process.env.NODE_ENV = "production";
}

module.exports = {
    cache: true,
    entry: {
        'required-common': './angular/required.common.ts',
        'announcement': './angular/announcement/announcement-main.ts',
        'article-related':'./angular/article-related/article-related.main.ts',
        'article-landing': './angular/article-landing/article-landing.main.ts',
        'assessment-landing':'./angular/assessment-landing/assessment-landing.main.ts',
        'candidate-profile': './angular/candidate/candidate-profile.main.ts',
        'event-detail': './angular/event-detail/event-detail.main.ts',
        'event-search': './angular/event-search/event-search.main.ts',
        'home': './angular/home/home.main.ts',
        'preparation': './angular/preparation/preparation.main.ts',
        'product-detail': './angular/product-detail/product-detail.main.ts',
        'program-profile': './angular/program-profile/program-profile.main.ts',
        'related-content': './angular/shared/components/related-content/related-content.main.ts',
        'related-topic': './angular/shared/components/related-topic/related-topic.main.ts',
        'school-finder': './angular/school-finder/school-finder.main.ts',
        'school-profile': './angular/school-profile/school-profile.main.ts',
        'article-save': './angular/article-save/article-save.main.ts',
        'practice-question': './angular/practice-question/practice-question.main.ts',
        'segmentation': './angular/segmentation/segmentation.main.ts',
        'ocp-store': './angular/ocp-store/ocp-store.main.ts',    
        'ir-prep-signin': './angular/ir-prep-signin/ir-prep-signin.main.ts'
    },
    plugins: pluginToLoad,
    output: {
        path: path.resolve('./angular/dist'),
        publicPath: '/MBAWeb/angular/dist/',
        filename: (process.env.NODE_ENV === 'production') ? '[name]-[hash].bundle.js' : '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.resolve('angular/tsconfig.json') }
                    }, 'angular2-template-loader'
                ],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
            },
            /* Embed files. */
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader',
                exclude: /\.async\.(html|css)$/
            },
            /* Async loading. */
            {
                test: /\.async\.(html|css)$/,
                loaders: ['file?name=[name].[hash].[ext]', 'extract']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.ts']
    }
};