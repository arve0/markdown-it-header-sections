

var md = require('markdown-it')()
  .use(require('markdown-it-anchor'))
  .use(require('./'))

console.log(md.render("# 11 \n ### 22 \n ## 33"))
