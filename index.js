
module.exports = function headerSections(md){

  function addSections(state){
    var tokens = [];  // output
    var Token = state.Token;

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

    var currentLevel = 0;
    for (var i = 0, l = state.tokens.length; i < l; i++) {
      var token = state.tokens[i];

      // add sections before headers
      if (token.type == 'heading_open') {
        var level = headingLevel(token.tag);
        if (level <= currentLevel) {
          tokens.push(closeSection());
        }
        currentLevel = level;
        tokens.push(openSection(token.attrs));
      }

      tokens.push(token);
    }  // end for every token

    // close sections
    for (; currentLevel !== 0; currentLevel--) {
      tokens.push(closeSection());
    }

    state.tokens = tokens;
  }

  md.core.ruler.push('header sections', addSections);

};


function headingLevel(header) {
  return parseInt(header.charAt(1));
}
