### 加载本地文件
在`vue-cli-plugin-electron-builder`中默认是无法加载本地文件的，但是官方**不推荐禁用** `WebSecurity`，而是推荐在`background.(js|ts)`中配置

##### 配置方法

```javascript
//background.js
app.on('ready', () => {
  registerLocalResourceProtocol()
  ...
})

function registerLocalResourceProtocol() {
  protocol.registerFileProtocol('local-resource', (request, callback) => {
    const url = request.url.replace(/^local-resource:\/\//, '')
    // Decode URL to prevent errors when loading filenames with UTF-8 chars or chars like "#"
    const decodedUrl = decodeURI(url) // Needed in case URL contains spaces
    try {
      return callback(decodedUrl)
    }
    catch (error) {
      console.error('ERROR: registerLocalResourceProtocol: Could not get file path:', error)
    }
  })
}
```

然后在本地文件前加上前缀`local-resource://`，比如`<img src="local-resource://image.png"/>`

官方链接: [Loading Local Images/Resources](https://github.com/nklayman/vue-cli-plugin-electron-builder/blob/master/docs/guide/security.md)

