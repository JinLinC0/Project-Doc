## `Cesium`源码编译

在[Releases · CesiumGS/cesium (github.com)](https://github.com/CesiumGS/cesium/releases)下载源码包，要下线`Source Code`压缩包，不是官方发布的包，官方正式发布包已经被阉割，出不来`“Development”`

- `cesium`源码编译打包需要`gulp`，全局安装`gulp`：

  ```txt
  npm install gulp -g
  ```

- 对`cesium`源码安装npm依赖：

  ```txt
  npm install
  ```

- `build`打包：

  ```txt
  npm run build
  ```

  在`Source`文件夹下生成了`Cesium.js`，还在`Specs`文件夹内生成了`SpecList.js`和在`Build`文件夹下生成了`minifyShaders.state`文件`Source`文件夹下的`Cesium.js`是把`Cesium`源码中一千两百多个`js`文件做了一下引用，相当于一个索引。打包之后`cesium`根目录下多出了`Build`文件夹

- 运行`cesium`：

  ```txt
  npm start
  ```

  就可以在浏览器中进行查看了：` http://localhost:8080/`

- 点击`Sandcastle`打开`cesium`官方案例

### 源代码工程目录介绍

- `APPs`：`demo`和相关资源
- `source`：包含项目的源代码，即开发人员编写的原始代码，这里可能包含未编译、未打包的原始文件，例如` JavaScript` 源文件、样式表、图像、模板等

- `Build`：构建过程的输出目录，其中包含了编译、打包、优化后的文件，即用于生产环境的文件
  - `CesiumUnminified`：这个文件夹包含未压缩、未混淆的源代码，源代码通常更易读，变量和函数名保持原样，方便开发者阅读和调试
  - `Cesium`Dev：这个文件夹包含经过压缩和混淆的代码，通常是生产环境中使用的版本