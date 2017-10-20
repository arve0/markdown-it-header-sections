
module.exports = function headerSections(md) {

  function addSections(state) {
    var tokens = [];  // output
    var Token = state.Token;
    var sections = [];
    var nestedLevel = 0;

    function openSection(attrs) {
      var t = new Token('section_open', 'section', 1);
      t.block = true;
      t.attrs = attrs && attrs.map(function (attr) { return [attr[0], attr[1]] });  // copy
      return t;
    }

    function closeSection() {
      var t = new Token('section_close', 'section', -1);
      t.block = true;
      return t;
    }

    function closeSections(section) {
      while (last(sections) && section.header <= last(sections).header) {
        sections.pop();
        tokens.push(closeSection());
      }
    }

    function closeSectionsToCurrentNesting(nesting) {
      while (last(sections) && nesting < last(sections).nesting) {
        sections.pop();
        tokens.push(closeSection());
      }
    }

    function closeAllSections() {
      while (sections.pop()) {
        tokens.push(closeSection());
      }
    }

    for (var i = 0, l = state.tokens.length; i < l; i++) {
      var token = state.tokens[i];

      // record level of nesting
      if (token.type.search('heading') !== 0) {
        nestedLevel += token.nesting;
      }
      if (last(sections) && nestedLevel < last(sections).nesting) {
        closeSectionsToCurrentNesting(nestedLevel);
      }

      // add sections before headers
      if (token.type == 'heading_open') {
        var section = {
          header: headingLevel(token.tag),
          nesting: nestedLevel
        };
        if (last(sections) && section.header <= last(sections).header) {
          closeSections(section);
        }
        tokens.push(openSection(token.attrs));
        if (token.attrIndex('id') !== -1) {
          // remove ID from token
          token.attrs.splice(token.attrIndex('id'), 1);
        }
        sections.push(section);
      }

      tokens.push(token);
    }  // end for every token
    closeAllSections();

    state.tokens = tokens;
  }

  md.core.ruler.push('header_sections', addSections);

};

function headingLevel(header) {
  return parseInt(header.charAt(1));
}

function last(arr) {
  return arr.slice(-1)[0];
}
