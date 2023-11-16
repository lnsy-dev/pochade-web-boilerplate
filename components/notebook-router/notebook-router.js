
/*
  notebookRouter
  
  Usage: 
  <notebook-router></notebook-router>

  See https://javascript.info/custom-elements for more information
*/

function parseJSONFrontmatter(markdownContent) {
  // Regular expression to match YAML or JSON frontmatter
  const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+/;

  // Check if frontmatter exists in the markdown content
  const match = markdownContent.match(frontmatterRegex);

  if(match === null){
    return {}
  }

  if (match && match[1]) {
    // Extract the frontmatter string
    const frontmatterString = match[1];

    try {
      // Parse the frontmatter string into a JavaScript object
      const frontmatterObject = JSON.parse(frontmatterString);

      return frontmatterObject;
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
      return {};
    }
  }

  // If no frontmatter is found, return null
  return null;
}

// Function to remove YAML front matter from a string
function removeFrontMatter(content) {
    const yamlRegex = /^---\n([\s\S]*?)\n---/;
    return content.replace(yamlRegex, '').trim();
}

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

    let loading_hash = window.location.hash.length > 0 ? window.location.hash.slice(1) : ''; 
    this.handleNewHash(loading_hash);
  }


  async handleNewHash(hash){
    if(hash.length < 1){
      hash = 'index';
    }
    this.innerHTML = `<notification>Loading ${hash}</notification>`;
    const data = await this.fetchData(hash + '.md'); 

    const parsed_json = parseJSONFrontmatter(data);
    const cleaned_data = removeFrontMatter(data);
    const customEvent = new CustomEvent('loaded', {
        detail: parsed_json,
    });

    // Dispatch the event on the "this" element
    this.dispatchEvent(customEvent);


// this text is formatted for proper markdown rendering.    
this.innerHTML = `
<mark-down>
${cleaned_data}
</mark-down>`
// end markdown
  }

  async fetchData(filename){
    const data = await fetch(filename)
        .then(res =>{

          if (!res.ok) {
            throw new Error('File not found (404)');
          }
          return res.text()
        })
        .catch(e => {
          return `${filename} not found`;
          // return this.searchForFile(filename);
        });
    return data;
  }

  /**
   * If a markdown file returns 404, search for the file.
   * @param  {string} filename -- the string of the filename
   * @return {string}          the contents of the markdown file
   */
  // async searchForFile(filename){

  // }

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
