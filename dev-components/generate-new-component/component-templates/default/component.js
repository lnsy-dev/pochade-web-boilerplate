/*
  ${ComponentName}
  
  Usage: 
  <${component-id}></${component-id}>

  See https://javascript.info/custom-elements for more information
*/

class ${ComponentName} extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback(){
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
    this.innerHTML = `${ComponentName} initialized`;
    this.init();
  }

  async init(){
    const data = await this.fetchData();
    this.innerText = JSON.stringify(data);
  }

  async fetchData(post = {}){
    const response = await fetch("/${component-id}", {
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

customElements.define('${component-id}', ${ComponentName});