import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/lib/codemirror.js'

document.head.insertAdjacentHTML( 'beforeend', `<link rel=stylesheet href="https://cdn.jsdelivr.net/npm/codemirror@5.62.2/lib/codemirror.css" >` );

import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/mode/javascript/javascript.js'
import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/mode/css/css.js'
import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/mode/xml/xml.js'
import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/mode/htmlmixed/htmlmixed.js'
import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/mode/markdown/markdown.js'
import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/addon/edit/closetag.js'

document.head.insertAdjacentHTML('beforeend', `

<style>

  /*
    Name:   lnsy-edit
    Author: by LNSY, adapted from DuoTone themes by Simurai (http://simurai.com/projects/2016/01/01/duotone-themes)

    CodeMirror template by Jan T. Sott (https://github.com/idleberg), adapted by Bram de Haan (https://github.com/atelierbram/)
  */

  .cm-s-lnsy-edit.CodeMirror { background: #000; color: #fff; }
  .cm-s-lnsy-edit div.CodeMirror-selected { background: #545167!important; }
  .cm-s-lnsy-edit .CodeMirror-gutters { background: #2a2734; border-right: 0px; }
  .cm-s-lnsy-edit .CodeMirror-linenumber { color: #545167; }

  /* begin cursor */
  .cm-s-lnsy-edit .CodeMirror-cursor { border-left: 1px solid #ffad5c; /* border-left: 1px solid #ffad5c80; */ border-right: .5em solid #ffad5c; /* border-right: .5em solid #ffad5c80; */ opacity: .5; }
  .cm-s-lnsy-edit .CodeMirror-activeline-background { background: #363342; /* background: #36334280;  */ opacity: .5;}
  .cm-s-lnsy-edit .cm-fat-cursor .CodeMirror-cursor { background: #ffad5c; /* background: #ffad5c80; */ opacity: .5;}
  /* end cursor */

  .cm-s-lnsy-edit span.cm-atom, .cm-s-lnsy-edit span.cm-number, .cm-s-lnsy-edit span.cm-keyword, .cm-s-lnsy-edit span.cm-variable, .cm-s-lnsy-edit span.cm-attribute, .cm-s-lnsy-edit span.cm-quote, .cm-s-lnsy-edit span.cm-hr, .cm-s-lnsy-edit span.cm-link { color: #ffcc99; }

  .cm-s-lnsy-edit span.cm-property { color: #9a86fd; }
  .cm-s-lnsy-edit span.cm-punctuation, .cm-s-lnsy-edit span.cm-unit, .cm-s-lnsy-edit span.cm-negative { color: #e09142; }
  .cm-s-lnsy-edit span.cm-string { color: #ffb870; }
  .cm-s-lnsy-edit span.cm-operator { color: #ffad5c; }
  .cm-s-lnsy-edit span.cm-positive { color: #6a51e6; }

  .cm-s-lnsy-edit span.cm-variable-2, .cm-s-lnsy-edit span.cm-variable-3, .cm-s-lnsy-edit span.cm-type, .cm-s-lnsy-edit span.cm-string-2, .cm-s-lnsy-edit span.cm-url { color: #7a63ee; }
  .cm-s-lnsy-edit span.cm-def, .cm-s-lnsy-edit span.cm-tag, .cm-s-lnsy-edit span.cm-builtin, .cm-s-lnsy-edit span.cm-qualifier, .cm-s-lnsy-edit span.cm-header, .cm-s-lnsy-edit span.cm-em { color: #999; }
  .cm-s-lnsy-edit span.cm-bracket, .cm-s-lnsy-edit span.cm-comment { color: #6c6783; }

  /* using #f00 red for errors, don't think any of the colorscheme variables will stand out enough, ... maybe by giving it a background-color ... */
  .cm-s-lnsy-edit span.cm-error, .cm-s-lnsy-edit span.cm-invalidchar { color: #f00; }

  .cm-s-lnsy-edit span.cm-header { font-weight: normal; }
  .cm-s-lnsy-edit .CodeMirror-matchingbracket { text-decoration: underline; color: #eeebff !important; } 


  lnsy-edit {
    background-color: black;
    padding: 0 1em 1em 0;
    margin: 0;
    color: white;
  }

  lnsy-edit details {
    padding: 0.25em;
    background-color: rgba(0,0,0,0.8);
    max-width: 40em;
  }

  lnsy-edit peer-component {
    width:  40em;
    display: inline-block;
    clear: both;
  }

  .CodeMirror {
       width: 100% !important;
       height: 100% !important;
  } 

  lnsy-edit #menu {
    margin: -1em 0 0 -1em;
    padding: 0;
    z-index: 100;
    padding: 1em;
    position: fixed;
    left: 0px;
    top: 0px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently */
  }

</style>



  `)


class LNSYEdit extends HTMLElement {
  connectedCallback(){
    this.textarea = document.createElement('textarea')
    this.appendChild(this.textarea)
    this.editor = CodeMirror.fromTextArea(this.textarea, {
    lineNumbers:false,
    mode:'markdown',
    theme:'lnsy-edit',
    autoCloseTags:true,
    lineWrapping: true
  })

  this.editor.setOption("extraKeys", {
  Tab: function(cm) {
      var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
      cm.replaceSelection(spaces);
    }
  })

  this.addEventListener('keydown', (e) =>{
    if(e.ctrlKey && e.code === 'KeyS'){
      e.preventDefault()
      const save_event = new CustomEvent('save', {
        detail: {
          content: this.editor.getValue(),
          timestamp: new Date().toISOString()
        }
      });

      this.dispatchEvent(save_event);

  // Dispatch the custom event on the document or any specific element

    }
  })


  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

}

customElements.define('lnsy-edit', LNSYEdit)

