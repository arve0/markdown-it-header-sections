# markdown-it-header-sections [![Build Status](https://travis-ci.org/arve0/markdown-it-header-sections.svg)](https://travis-ci.org/arve0/markdown-it-header-sections) [![npm version](https://badge.fury.io/js/markdown-it-header-sections.svg)](http://badge.fury.io/js/markdown-it-header-sections)


Renders this markdown
```md
# Header 1
Text.
### Header 2
Lorem?
## Header 3
Ipsum.
# Last header
Markdown rules!
```

to this output (without indentation)
```html
<section>
  <h1>Header 1</h1>
  <p>Text.</p>
  <section>
    <h3>Header 2</h3>
    <p>Lorem?</p>
  </section>
  <section>
    <h2>Header 3</h2>
    <p>Ipsum.</p>
  </section>
</section>
<section>
  <h1>Last header</h1>
  <p>Markdown rules!</p>
</section>
```

If you add [attrs], [anchor] or any other plugin that adds attributes to header-tokens, sections will have the same attributes (which is useful for styling).

E.g., with [attrs] enabled before header-sections:

```js
var md = require('markdown-it')()
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-header-sections'))
```

this markdown
```md
# great stuff {.jumbotron}
lorem

click me {.btn .btn-default}
```

renders to
```md
<section class="jumbotron">
  <h1 class="jumbotron">great stuff</h1>
  <p>lorem</p>
  <p class="btn btn-default">click me</p>
</section>
```

## Install
```
npm install markdown-it-header-sections
```

## Usage
```js
var md = require('markdown-it')();
md.use(require('markdown-it-header-sections'));

var src = '# first header\n';
src += 'lorem\n\n'
src += '## second header\n';
src += 'ipsum';

console.log(md.render(src));
```

[demo as jsfiddle](https://jsfiddle.net/arve0/5dn54cow/1/)


[attrs]: https://github.com/arve0/markdown-it-attrs
[anchor]: https://github.com/valeriangalliat/markdown-it-anchor
