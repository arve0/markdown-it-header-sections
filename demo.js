
var ml = require('multiline');
var md = require('markdown-it')()
  .use(require('markdown-it-attrs'))
  .use(require('./'));

var src = ml(function(){/*
# great stuff {.jumbotron}
lorem

click me {.btn .btn-default}
*/});

console.log(md.render(src));
