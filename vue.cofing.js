module.exports = {
  css: {
    loaderOptions: {
     
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      },
      // 给 less-loader 传递 Less.js 相关选项
      less:{
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff'
        }
      }
    }
  }
};