import "//cdn.jsdelivr.net/npm/marked/marked.min.js";

/*

This regex modification uses a negative lookahead ((?![^<>]*>)) 
to ensure that the match does not occur inside angle 
brackets (< and >), effectively excluding matches 
within an <svg> tag. The (^|[^<]) part ensures that 
the match is either at the beginning of the string or not preceded by a <.

 */
function wrapHashtags(text) {
  // Regular expression to find hashtags (words starting with #) excluding those preceded by a character
  const hashtagRegex = /(^|[^#\w])#([a-zA-Z0-9\-./]+)(?![^<>]*>)/g;
  // Replace hashtags with <hash-tag>...</hash-tag>
  const result = text.replace(hashtagRegex, '$1<hash-tag>$2</hash-tag>');
  return result;
}

/*

This regex modification uses a negative lookahead ((?![^<>]*>)) 
to ensure that the match does not occur inside angle 
brackets (< and >), effectively excluding matches 
within an <svg> tag. The (^|[^<]) part ensures that 
the match is either at the beginning of the string or not preceded by a <.

 */
function wrapVariables(text) {
  // Regular expression to find hashtags (words starting with #) excluding those inside <svg> tags
  const hashtagRegex = /(^|[^<])@([a-zA-Z0-9\-./]+)(?![^<>]*>)/g;
  // Replace hashtags with <hash-tag>...</hash-tag>
  const result = text.replace(hashtagRegex, '$1<variable-tag>$2</variable-tag>');
  return result;
}

/*

This regex modification uses a negative lookahead ((?![^<>]*>)) 
to ensure that the match does not occur inside angle 
brackets (< and >), effectively excluding matches 
within an <svg> tag. The (^|[^<]) part ensures that 
the match is either at the beginning of the string or not preceded by a <.

 */
function wrapEmbeds(text) {
  // Regular expression to find hashtags (words starting with #) excluding those inside <svg> tags
  const hashtagRegex = /(^|[^<])\##([a-zA-Z0-9\-./]+)(?![^<>]*>)/g;
  // Replace hashtags with <hash-tag>...</hash-tag>
  const result = text.replace(hashtagRegex, '$1<embed-tag>$2</embed-tag>');
  return result;
}

/*
This code defines a parseTextToJSON function 
that takes the input text as a parameter and returns the 
corresponding JSON object. The code uses regular expressions 
to extract node names from the input text, and then it 
constructs the nodes and edges arrays accordingly. 
Finally, it logs the resulting JSON object to the console.

 */

function parseTextToJSON(inputText) {
  const lines = inputText.trim().split('\n');
  const nodes = [];
  const edges = [];

  lines.forEach((line) => {
    const [source, target] = line.match(/\[([^\]]+)\]/g).map((node) => node.slice(1, -1));

    if (!nodes.some((node) => node.id === source)) {
      nodes.push({ id: source });
    }

    if (!nodes.some((node) => node.id === target)) {
      nodes.push({ id: target });
    }

    edges.push({ source, target });
  });

  return { nodes, edges };
}




function setURLValues(obj){
  let url = window.location.origin + window.location.pathname + '?'
  Object.keys(obj).forEach(key => {
    url += `&${key}=${obj[key]}`
  })
  history.pushState(obj, '', url)
}

function generateURLFromObject(obj){
  let url = window.location.origin + window.location.pathname + '?';
  Object.keys(obj).forEach(key => {
    url += `&${key}=${obj[key]}`;
  });
  return url;
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

function sanitizeToUtf8(inputString) {
  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(inputString);
  const utf8String = new TextDecoder('utf-8').decode(utf8Bytes);
  return utf8String;
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
    const wrap_variables = wrapVariables(wrap_hashtags);
    const wrap_embed = wrapEmbeds(wrap_variables);

    const final_text = wrap_embed;
    this.innerHTML = marked.parse(final_text);
    [...document.querySelectorAll('.language-svg')].forEach(svg => {
      const div = document.createElement('div');
        div.innerHTML = svg.innerText;
        svg.innerHTML = " ";
        svg.appendChild(div);
    });
    [...document.querySelectorAll('.language-graph')].forEach(diagram => {
      diagram.innerText = JSON.stringify(parseTextToJSON(diagram.innerText));
    });
  }
}

customElements.define('mark-down', MarkdownComponent);

class HashTag extends HTMLElement {
  connectedCallback(){
    this.addEventListener('click', (e) => {
      const open_in_new_tab = e.ctrlKey;
      if (open_in_new_tab) {
        const new_url = generateURLFromObject({'file-id':this.innerText})
        const newTab = window.open(new_url, '_blank');
        if (newTab) {
          newTab.focus();
        }
      } else {
        setURLValues({'file-id':this.innerText});
        window.location.assign(window.location.href);
      }
    });
  }
}

customElements.define('hash-tag', HashTag);