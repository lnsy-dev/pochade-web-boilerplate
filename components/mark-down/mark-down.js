import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

/*

This regex modification uses a negative lookahead ((?![^<>]*>)) 
to ensure that the match does not occur inside angle 
brackets (< and >), effectively excluding matches 
within an <svg> tag. The (^|[^<]) part ensures that 
the match is either at the beginning of the string or not preceded by a <.

 */
function wrapHashtags(text) {
  // Regular expression to find hashtags (words starting with #) excluding those inside <svg> tags
  const hashtagRegex = /(^|[^<])#([a-zA-Z0-9\-./]+)(?![^<>]*>)/g;
  // Replace hashtags with <hash-tag>...</hash-tag>
  const result = text.replace(hashtagRegex, '$1<hash-tag>$2</hash-tag>');
  return result;
}


function setURLValues(obj){
  let url = window.location.origin + window.location.pathname + '?'
  Object.keys(obj).forEach(key => {
    url += `&${key}=${obj[key]}`
  })
  history.pushState(obj, '', url)
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
    [...document.querySelectorAll('.language-svg')].forEach(svg => {
      const div = document.createElement('div');
        div.innerHTML = svg.innerText;
        svg.innerHTML = " ";
        svg.appendChild(div);
    });
  }
}

customElements.define('mark-down', MarkdownComponent);

class HashTag extends HTMLElement {
  connectedCallback(){
    this.addEventListener('click', (e) => {
     setURLValues({'file-id':this.innerText});
     window.location.assign(window.location.href)
    });
  }
}

customElements.define('hash-tag', HashTag);