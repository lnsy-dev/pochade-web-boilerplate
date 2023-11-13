/*
  removeComponent
  
  Usage: 
  <remove-component></remove-component>

  See https://javascript.info/custom-elements for more information
*/

class removeComponent extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback(){
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
    this.innerHTML = `removeComponent initialized`;
    this.init();
  }

  async init(){
    const data = await this.fetchData();
    this.innerText = JSON.stringify(data);
  }



  async fetchData(post = {}){
    const response = await fetch("/hans-prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post)
    });
    const data = response.json();
    return data;
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
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

customElements.define('remove-component', removeComponent);
