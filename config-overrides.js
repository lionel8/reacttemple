/* config-overrides.js */
  /*
  * @Author: 
  * @Last Modified time: 2020-03-22 18:37:17
  * @Description: 使用 react-app-rewired 扩展和改造 CRA
  */
 const { 
    override,
    addDecoratorsLegacy,
    disableEsLint,
    addBundleVisualizer,
    fixBabelImports,
    addLessLoader,
    addWebpackExternals,
    addWebpackAlias
} = require("customize-cra");
const path = require("path")
 // 增加打包插件 
//  const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
// const customPlugin = [
//   new UglifyJsPlugin(
//     {
//       uglifyOptions: {
//         warnings: false,
//         compress: {
//           drop_debugger: true,
//           drop_console: true
//         }
//       }
//     }
//   )
// ]
 module.exports = override(
    addDecoratorsLegacy(),
    disableEsLint(),
    addBundleVisualizer({}, true),
   // 使用 babel-plugin-import 按需加载组件
   fixBabelImports("import", {
    libraryName: "antd", libraryDirectory: "es", style: true 
   }),
   //直接以cdn引入的,不打包
   addWebpackExternals({ 
    echarts: "window.echarts",
    // react: "React",
    // "react-dom": "ReactDom"
   }),
   //路径别名,组件引用文件模块作为映射使用
   addWebpackAlias({ 
     //'@': path.resolve(__dirname, 'src'),
     //components: path.resolve(__dirname, 'src/components'),
     //assets: path.resolve(__dirname, 'src/assets')
   }),
   // 增加 less 支持
   addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
   }),
   //覆盖webpack的配置
   (config)=>{
     console.log('=================================================================================')
     console.log("1.dotenv将对应环境的变量进行打包")
     console.log("2.除了开发环境外，node都是生产环境：process.env.NODE_ENV=>"+process.env.NODE_ENV)
     console.log("3.可根据打包环境变量BUILD_ENV，修改覆盖webpack配置：process.env.BUILD_ENV=>"+process.env.BUILD_ENV)
     console.log('=================================================================================')
     console.log("webpack配置如下：")
     console.log(config)
     console.log('=================================================================================')
     // 1.去掉打包生产map 文件
     //config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
     //if(process.env.NODE_ENV==="production") config.devtool=false;

     // 2.增加webpack 自定义plugin配置，customPlugin
     // if(process.env.NODE_ENV!=="development") config.plugins = [...config.plugins,...customPlugin]

    // 3.根据环境,配置打包资源绝对路径
    //  if(process.env.BUILD_ENV == 'sit'){
    //    config.output.publicPath = "{domain_url}/s/{app_context_env}/{current_path_version}"
    //  }else if(process.env.BUILD_ENV == 'uat'){
    //   config.output.publicPath = "{domain_url}/s/{app_context_env}/{current_path_version}"
    //  }else if(process.env.BUILD_ENV == 'production'){
    //   config.output.publicPath = "{domain_url}/s/{app_context_env}/{current_path_version}"
    //  }

    // 3.修改、添加loader 配置 :
    // 所有的loaders规则是在config.module.rules(数组)的第二项
    // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
    // 修改 sass 配置 ，规则 loader 在第五项(具体看配置)
    // const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
    // loaders[5].use.push({
    //     loader: 'sass-resources-loader',
    //     options: {
    //         resources: path.resolve(__dirname, 'src/asset/base.less')//全局引入公共的scss 文件
    //     }
    // }) 

    config.optimization.splitChunks.cacheGroups = {
      commons: {
        name: 'commons',
        chunks: 'initial',
        minChunks: 2
      },
      i18n: {
        name: 'i18n',
        test: /[\\/]node_modules[\\/](intl|react-intl-universal|js-cookie|axios)[\\/]/,
        chunks: 'all'
      },
      vendor: {
        test: /[\\/]node_modules[\\/](react|react-dom|react-redux|react-app-polyfill|loadash|echarts-for-react)[\\/]/,
        name: 'vendor',
        chunks: 'all', // all, async, and initial
      },
      antd: {
        name: 'antd',
        test: /[\\/]node_modules[\\/]antd[\\/]/,
        chunks: 'all'
      },
      styles: {            
        name: 'styles',
        test: /\.css|less$/,
        chunks: 'all',    // merge all the css chunk to one file
        enforce: true
      }
    }
    // config.optimization = {
    //     splitChunks: {
    //       // 将所有入口点共同使用到的、次数超过 2 次的模块，创建为一个名为 commons 的代码块
    //       // 这种配置方式可能会增大初始的捆绑包，比如有些公共模块在首页其实并未用到，但也会打包进来，会降低首页的加载性能
    //       // 建议将非必需模块使用 import() 的方式动态加载，提升页面的加载速度
    //       // cacheGroups: {
    //       //   commons: {
    //       //     name: 'commons',
    //       //     chunks: 'initial',
    //       //     minChunks: 2
    //       //   }
    //       // }

    //       cacheGroups: {
    //         // 通过正则匹配，将 react react-dom echarts-for-react 等公共模块拆分为 vendor
    //         // 这里仅作为示例，具体需要拆分哪些模块需要根据项目需要进行配置
    //         // 可以通过 BundleAnalyzerPlugin 帮助确定拆分哪些模块包
    //         vendor: {
    //           test: /[\\/]node_modules[\\/](react|react-dom|echarts-for-react)[\\/]/,
    //           name: 'vendor',
    //           chunks: 'all', // all, async, and initial
    //         },
    
    //         // 将 css|less 文件合并成一个文件, mini-css-extract-plugin 的用法请参见文档：https://www.npmjs.com/package/mini-css-extract-plugin
    //         // MiniCssExtractPlugin 会将动态 import 引入的模块的样式文件也分离出去，将这些样式文件合并成一个文件可以提高渲染速度
    //         // 其实如果可以不使用 mini-css-extract-plugin 这个插件，即不分离样式文件，可能更适合本方案，但是我没有找到方法去除这个插件
    //         styles: {            
    //           name: 'styles',
    //           test: /\.css|less$/,
    //           chunks: 'all',    // merge all the css chunk to one file
    //           enforce: true
    //         }
    //       },
    //     },
    // };
     return config
   }
 );