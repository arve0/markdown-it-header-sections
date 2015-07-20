
var assert = require('assert');
var Md = require('markdown-it');
var multiline = require('multiline');
var headerSections = require('./');

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
    assert.equal(expected, res);
  });

  it('should add header attributes from other plugins', function(){
    var expected = multiline.stripIndent(function(){/*
      <section id="header">
      <h1 id="header">header</h1>
      <p>lorem</p>
      </section>

    */});
    md.use(require('markdown-it-anchor'));
    md.use(headerSections);
    var res = md.render(simpleSrc);
    assert.equal(expected, res);
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
    assert.equal(expected, res);
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
    assert.equal(expected, res);
  });

});
