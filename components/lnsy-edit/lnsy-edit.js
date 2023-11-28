import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/lib/codemirror.js'

document.head.insertAdjacentHTML( 'beforeend', `<link rel=stylesheet href="https://cdn.jsdelivr.net/npm/codemirror@5.62.2/lib/codemirror.css" >` );

import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/mode/javascript/javascript.js'
import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/mode/css/css.js'
import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/mode/xml/xml.js'
import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/mode/htmlmixed/htmlmixed.js'
import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/mode/markdown/markdown.js'
import 'https://cdn.jsdelivr.net/npm/codemirror@5.62.2/addon/edit/closetag.js'


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
    });

    this.editor.setOption("extraKeys", {
      Tab: function(cm) {
        var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
        cm.replaceSelection(spaces);
      }
    });

    /* Detect Save Key */
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
      }
    });
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

