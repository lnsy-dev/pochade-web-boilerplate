/*
  jsonEditorComponent
  
  Usage: 
  <json-editor-component></json-editor-component>

  See https://javascript.info/custom-elements for more information
*/


import { JSONEditor } from 'https://cdn.jsdelivr.net/npm/vanilla-jsoneditor/index.js'


// use methods get, set, update, and onChange to get data in or out of the editor.
// Use updateProps to update properties.

class jsonEditorComponent extends HTMLElement {
  constructor() {
    super();
    // element created
    // 
  }

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
        onChange: (updatedContent, previousContent, { contentErrors, patchResult }) => {
          // content is an object { json: JSONValue } | { text: string }
          // console.log('onChange', { updatedContent, previousContent, contentErrors, patchResult })
          this.content = updatedContent;
          const save_event = new CustomEvent('save', {
            detail: {
              content: this.content,
              timestamp: new Date().toISOString()
            }
          });

          this.dispatchEvent(save_event);

        }
      }
    });
  }

  updateData(value){
    const content = {
      json: value
    }
    this.editor.set(content);
  
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