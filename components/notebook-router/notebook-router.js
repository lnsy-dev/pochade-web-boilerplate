/*
  notebookRouter
  
  Usage: 
  <notebook-router></notebook-router>

  See https://javascript.info/custom-elements for more information
*/

class notebookRouter extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback(){
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
    this.innerHTML = `notebookRouter initialized`;
    this.init();

  }

  async init(){
    window.addEventListener('hashchange', (e) => {
      this.handleNewHash(window.location.hash.slice(1));
    });

    const loading_hash = window.location.hash.length > 0 ? window.location.hash.slice(1) : 'index'; 
    this.handleNewHash(loading_hash);
  }


  async handleNewHash(hash){
    this.innerHTML = `<notifcation>Loading ${hash}</notification>`;
    const data = await this.fetchData(hash + '.md'); 
    this.innerHTML = `
<mark-down>
${data}
</mark-down>`
  }

  async fetchData(filename){
    console.log(filename);
    const data = await fetch(filename)
        .then(res => res.text());
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

customElements.define('notebook-router', notebookRouter);
