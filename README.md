# markdown-it header sections

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

Add [anchor] or any plugin that adds attributes to header-tokens if you would like to add identifiers the sections.

E.g. with anchor enabled, `# great stuff` renders to `<section id="great-stuff"><h1 id="great-stuff">great stuff</h1></section>` with [anchor] added before this plugin.

[anchor]: https://github.com/valeriangalliat/markdown-it-anchor
