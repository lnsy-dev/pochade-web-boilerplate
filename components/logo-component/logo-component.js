/*
  logoComponent
  
  Usage: 
  <logo-component></logo-component>

  See https://javascript.info/custom-elements for more information
*/

class logoComponent extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback(){
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
    this.innerHTML = `logoComponent initialized`;
    this.init();
  }

  async init(){
    this.innerHTML = `<a href="/" title="index" class="no-tufte-underline" style="font-size: 24px">☉</a>`;
  }



  // async fetchData(post = {}){
  //   const response = await fetch("logo-component", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(post)
  //   });
  //   const data = response.json();
  //   return data;
  // }

  // disconnectedCallback() {
  //   // browser calls this method when the element is removed from the document
  //   // (can be called many times if an element is repeatedly added/removed)
  // }

  // adoptedCallback() {
  //   // called when the element is moved to a new document
  //   // (happens in document.adoptNode, very rarely used)
  // }

  // static get observedAttributes() {
  //   return [];
  // }

  // attributeChangedCallback(name, old_value, new_value){
  //   switch(name){
  //     default:
  //   }
  // }

}

customElements.define('logo-component', logoComponent);
