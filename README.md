heavenswen.github.io
----
## SPA单页程序
单页Web应用（single page web application，SPA），就是只有一张Web页面的应用，是加载单个HTML 页面并在用户与应用程序交互时动态更新该页面的Web应用程序。

### 简介
vuejs、reactjs MV**框架在数据和页面显示的优先表现也让人们很愿意开发使用这个开发策略，但这种形式由于使用js渲染的方式使数据在SEO上表现极差(爬虫只能抓取源码上的标签内容)，在解决SEO也成为了SPA程序的大难题：
+ 预渲染：在单页面应用程序中呈现静态HTM,无需使用 web 服务器实时动态编译 HTMLL。
    + seo内容是固定的修改时需要重新打包吗，主要用于简单的场景。
    + 相对SSR配置更简单。
    + 到达速度更快。 
    
    
+ SSR：
    + 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
    + 更快的内容到达时间(time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。无需等待所有的 JavaScript 都完成下载并执行，才显示服务器渲染的标记，所以你的用户将会更快速地看到完整渲染的页面。通常可以产生更好的用户体验，并且对于那些「内容到达时间(time-to-content)与转化率直接相关」的应用程序而言，服务器端渲染(SSR)至关重要。
    + 采用nodejs同构的方式
    + 更多的服务器端负载。在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源(CPU-intensive - CPU 密集)，因此如果你预料在高流量环境(high traffic)下使用，请准备相应的服务器负载，并明智地采用缓存策略。

### 技术要点
这边主要讲述的是以vuejs2使用wevpack3进行单页程序的编写和构建，利用插件[prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)来对站点的生成。

PhantomJS是一个基于WebKit的服务器端JavaScript API，它基于 BSD开源协议发布。PhantomJS无需浏览器的支持即可实现对Web的支持，且原生支持各种Web标准，如DOM 处理、JavaScript、CSS选择器、JSON、Canvas和可缩放矢量图形SVG。PhantomJS主要是通过JavaScript和CoffeeScript控制WebKit的CSS选择器、可缩放矢量图形SVG和HTTP网络等各个模块。

屏幕捕获：以编程方式抓起CSS、SVG和Canvas等页面内容，即可实现网络爬虫应用。构建服务端Web图形应用，如截图服务、矢量光栅图应用。
网络监控：自动进行网络性能监控、跟踪页面加载情况以及将相关监控的信息以标准的HAR格式导出。

### 操作

1. 下载依赖
```
npm i prerender-spa-plugin
```

在window下，国内环境可能会出现： "file" argument must be a non-empty string 的错误这是因为缺少  phantomjs-prebuilt 依赖
```
npm i  phantomjs-prebuilt
```
然后你就会看到 npm wrr path H:\web\vue-prerender\node_modules\.bin\phantomjs.cmd

2. 下载 phantomjs
```
npm i phantomjs
```
PhantomJS 的地址是找不到的，根据它的提示我们手动下载。

PhantomJS not found on PATH
Downloading https://github.com/Medium/phantomjs/releases/download/v2.1.1//phantomjs-2.1.1-windows.zip
Saving to C:\Users\qiu\AppData\Local\Temp\phantomjs\phantomjs-2.1.1-windows.zip
Receiving...

3. 依照原来的提示
```
npm i  phantomjs-prebuilt
```
4. webpack.config.js

```
var path = require('path')
var PrerenderSpaPlugin = require('prerender-spa-plugin')

module.exports = {
  // ...
  plugins: [
    new PrerenderSpaPlugin(
      // 生成SPA的地址
      path.join(__dirname, '../dist'),
      // 需要路由的地址
      [ '/', '/about', '/about/1' ]
    )
  ]
}

```
如果你使用了模版引擎
```
new HtmlWebpackPlugin({
  // ... your other options ...
  // 确保注入异步块 <head>
  inject: 'head',
  // 确保按正确的顺序评估块
  chunksSortMode: 'dependency'
})
```
5. 如果使用vue-routes 
```
const router = new VueRouter({
    mode: 'history',
    
})
```
history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面,但是需要服务器的支持-[History 模式](https://router.vuejs.org/zh-cn/essentials/history-mode.html)
##### Apache
httpd.conf
``` 
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
nginx
```
location / {
  try_files $uri $uri/ /index.html;
}
```
原生nodejs
````
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```
Express
对于 Node.js/Express，请考虑使用 connect-history-api-fallback 中间件。
webpack

```
devServer: {
		port: 8010,
		//设置为真,如果你想从任意url访问开发服务器。
		historyApiFallback: true,
		noInfo: true,
		//设置这个如果你想启用gzip压缩的资产
		compress: true,
	},

```

