import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

function convertObsidianLinks(text) {
    // Regular expression to match Wikimedia-style links
    var wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
    // Replace each match with the corresponding HTML link
    var convertedText = text.replace(wikiLinkRegex, function (match, p1) {
        return '<a href="#' + p1 + '">' + p1 + '</a>';
    });
    return convertedText;
}

class MarkdownComponent extends HTMLElement {
  connectedCallback(){
    this.src = this.getAttribute('src'); 

    if(this.src === null){
      const content = this.innerHTML; 
      this.render(content);
    } else {
      fetch(this.src)
        .then(res => res.text())
        .then(res => {
          this.render(res);
        });
    }
  }

  render(content){
    const wikimedia_to_href = convertObsidianLinks(content);
    this.innerHTML = marked.parse(wikimedia_to_href);
  }
}

customElements.define('mark-down', MarkdownComponent);