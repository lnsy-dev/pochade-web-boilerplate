import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

function wrapHashtags(text) {
  // Regular expression to find hashtags (words starting with #)
  const hashtagRegex = /#([a-zA-Z0-9-]+)/g;
  // Replace hashtags with <hash-tag>...</hash-tag>
  const result = text.replace(hashtagRegex, '<hash-tag>$1</hash-tag>');
  return result;
}

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
    const wrap_hashtags = wrapHashtags(wikimedia_to_href);
    this.innerHTML = marked.parse(wrap_hashtags);
  }
}

customElements.define('mark-down', MarkdownComponent);

class HashTag extends HTMLElement {
  connectedCallback(){
    this.addEventListener('click', (e) => {
      window.location.hash = this.innerText;
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

customElements.define('hash-tag', HashTag)