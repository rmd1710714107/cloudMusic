module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    ["import", {
      "libraryName": "muse-ui",
      "libraryDirectory": "lib",
      "camel2DashComponentName": false
    }]
  ]
}
