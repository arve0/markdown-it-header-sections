# markdown-it-header-sections
[![Build Status](https://travis-ci.org/arve0/markdown-it-header-sections.svg)](https://travis-ci.org/arve0/markdown-it-header-sections)
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

If you add [anchor] or any plugin that adds attributes to header-tokens, sections will have the same attributes (which is useful for styling).

E.g., with [anchor] enabled before header-sections:

```js
var md = require('markdown-it')()
  .use(require('markdown-it-anchor'))
  .use(require('markdown-it-header-sections'))
```

this markdown
```md
# great stuff
lorem
```

renders to
```md
<section id="great-stuff">
  <h1 id="great-stuff">great stuff</h1>
  <p>lorem</p>
</section>
```

[anchor]: https://github.com/valeriangalliat/markdown-it-anchor
