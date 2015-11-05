
module.exports = function headerSections(md){

  function addSections(state){
    var tokens = [];  // output
    var Token = state.Token;
    var sectionLevel = 0;
    var prevHeaderLevel = 0;

    function closeSection(){
      var t = new Token('section_close', 'section', -1);
      t.block = true;
      return t;
    }

    function openSection(attrs){
      var t = new Token('section_open', 'section', 1);
      t.block = true;
      t.attrs = attrs;
      return t;
    }

    function closeSections(from, to) {
      // close one below to
      while (from > (to-1)) {
        tokens.push(closeSection());
        from--;
      }
      return from;
    }

    for (var i = 0, l = state.tokens.length; i < l; i++) {
      var token = state.tokens[i];

      // add sections before headers
      if (token.type == 'heading_open') {
        var level = headingLevel(token.tag);
        if (level <= prevHeaderLevel) {
          sectionLevel = closeSections(sectionLevel, level);
        }
        tokens.push(openSection(token.attrs));
        sectionLevel++;
        prevHeaderLevel = level;
      }

      tokens.push(token);
    }  // end for every token
    closeSections(sectionLevel, 1);

    state.tokens = tokens;
  }

  md.core.ruler.push('header_sections', addSections);

};

function headingLevel(header) {
  return parseInt(header.charAt(1));
}
