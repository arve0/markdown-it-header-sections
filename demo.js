const md = require('markdown-it')()
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-header-sections'));

const src = `# great stuff {.jumbotron}
lorem

## section 2
click me {.btn .btn-default}`;

console.log(md.render(src));
