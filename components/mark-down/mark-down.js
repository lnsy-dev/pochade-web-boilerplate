import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
class MarkdownComponent extends HTMLElement {
  connectedCallback(){
    this.src = this.getAttribute('src'); 

    if(this.src === null){
      const content = this.innerHTML; 
      this.innerHTML = marked.parse(content);
    } else {
      fetch(this.src)
        .then(res => res.text())
        .then(res => {
          this.innerHTML = marked.parse(res);
        });
    }
  }
}

customElements.define('mark-down', MarkdownComponent);