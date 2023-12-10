/*
  jsonEditorComponent
  
  Usage: 
  <json-editor-component></json-editor-component>

  See https://javascript.info/custom-elements for more information
*/


import { JSONEditor } from './vendor/vanilla-json-editor.js'

// use methods get, set, update, and onChange to get data in or out of the editor.
// Use updateProps to update properties.

class jsonEditorComponent extends HTMLElement {
  connectedCallback(){
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)

    this.content = this.getAttribute('value');
    if(this.content === null){
      this.content = {}
    } else {
      try {
        this.content = JSON.parse(this.content);
      } catch(e){
        this.content = {};
      }
    }

    this.init();
  }

  async init(){
    this.editor = new JSONEditor({
      target: this,
      props: {
        content: {json: this.content},
      }
    });
  }

  getData(){
    return this.editor.get().json
  }

  updateData(value){
    const content = {
      json: value
    }
    this.editor.set(content);
  }

  upsertData(obj){
    const previous = this.editor.get().json;
    const new_value = Object.assign(previous, obj);
    this.editor.set({
      json: new_value
    });
  }

  static get observedAttributes() {
    return ['values'];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
    case "values":
      this.updateData(new_value);
      break;
      default:
    }
  }
}

customElements.define('json-editor', jsonEditorComponent);