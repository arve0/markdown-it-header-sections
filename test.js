
var assert = require('assert');
var Md = require('markdown-it');
var multiline = require('multiline');
var headerSections = require('./');

var origEqual = assert.equal;
assert.equal = function(actual, expected) {
  var r = /\r/g
  return origEqual(actual.replace(r, ''), expected.replace(r, ''));
}

describe('markdown-it-header-sections', function(){

  var md;
  var simpleSrc = multiline.stripIndent(function(){/*
    # header
    lorem
  */});

  beforeEach(function(){
    md = Md();
  });

  it('should add sections to headers', function(){
    var expected = multiline.stripIndent(function(){/*
      <section>
      <h1>header</h1>
      <p>lorem</p>
      </section>

    */});
    md.use(headerSections);
    var res = md.render(simpleSrc);
    assert.equal(res, expected);
  });

  it('should add header attributes from other plugins', function(){
    var src = multiline.stripIndent(function(){/*
      # header {.red}
      lorem
    */});
    var expected = multiline.stripIndent(function(){/*
      <section class="red">
      <h1 class="red">header</h1>
      <p>lorem</p>
      </section>

    */});
    md.use(require('markdown-it-attrs'));
    md.use(headerSections);
    var res = md.render(src);
    assert.equal(res, expected);
  });

  it('should close sections when a new header is of same or lower level', function(){
    var src = multiline.stripIndent(function(){/*
      # asdf
      lorem
      # fdsa
      ipsum
    */});
    var expected = multiline.stripIndent(function(){/*
      <section>
      <h1>asdf</h1>
      <p>lorem</p>
      </section>
      <section>
      <h1>fdsa</h1>
      <p>ipsum</p>
      </section>

    */});
    md.use(headerSections);
    var res = md.render(src);
    assert.equal(res, expected);
  });

  it('should nest sections', function(){
    var src = multiline.stripIndent(function(){/*
      # Header 1
      Text.
      ### Header 2
      Lorem?
      ## Header 3
      Ipsum.
      # Last header
      Markdown rules!
    */});
    var expected = multiline.stripIndent(function(){/*
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

    */});
    md.use(headerSections);
    var res = md.render(src);
    assert.equal(res, expected);
  });

  it('should parse incorrect order of headers', function(){
    var src = multiline.stripIndent(function(){/*
      #### Header 4
      Text.
      ### Header 3
      Hello!
    */});
    var expected = multiline.stripIndent(function(){/*
      <section>
      <h4>Header 4</h4>
      <p>Text.</p>
      </section>
      <section>
      <h3>Header 3</h3>
      <p>Hello!</p>
      </section>

    */});
    md.use(headerSections);
    var res = md.render(src);
    assert.equal(res, expected);
  });
  it('should handle sections in list', function(){
    var src = multiline.stripIndent(function(){/*
      - foo
        ### Header 2
        Lorem?
      - bar
        ## Last header
        Markdown rules!
    */});
    var expected = multiline.stripIndent(function(){/*
      <ul>
      <li>foo
      <section>
      <h3>Header 2</h3>
      Lorem?</section>
      </li>
      <li>bar
      <section>
      <h2>Last header</h2>
      Markdown rules!</section>
      </li>
      </ul>

    */});
    md.use(headerSections);
    var res = md.render(src);
    assert.equal(res, expected);
  });

  it('should close sections when a new header is of same level', function(){
    var src = multiline.stripIndent(function(){/*
      ### asdf
      lorem
      ### fdsa
      ipsum
    */});
    var expected = multiline.stripIndent(function(){/*
      <section>
      <h3>asdf</h3>
      <p>lorem</p>
      </section>
      <section>
      <h3>fdsa</h3>
      <p>ipsum</p>
      </section>

    */});
    md.use(headerSections);
    var res = md.render(src);
    assert.equal(res, expected);
  });

  it('should move, not copy, ID from header', function(){
    var src = multiline.stripIndent(function(){/*
      # asdf {#asdf}
      qwerty
    */});
    var expected = multiline.stripIndent(function(){/*
      <section id="asdf">
      <h1>asdf</h1>
      <p>qwerty</p>
      </section>

    */});
    md.use(require('markdown-it-attrs'));
    md.use(headerSections);
    var res = md.render(src);
    assert.equal(res, expected);
  });
});
