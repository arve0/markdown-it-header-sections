# MarkdownIt Header Sections

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
<section id="header-1">
  <h1>Header 1</h1>
  <p>Text.</p>
  <section id="header-2">
    <h3>Header 2</h3>
    <p>Lorem?</p>
  </section>
  <section id="header-3">
    <h2>Header 3</h2>
    <p>Ipsum.</p>
  </section>
</section>
<section id="last-header">
  <h1>Last header</h1>
  <p>Markdown rules!</p>
</section>
```
