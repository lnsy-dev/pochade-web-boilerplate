// Import the marked library from a CDN
import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

// Function to embed markdown content in the specified format
function embedMarkdown(text) {
  // Regular expression to match embedded markdown syntax
  const regex = /!\[\[([^[\]]+)\]\]/g;
  // Replace each match with a custom HTML tag for rendering markdown content
  const replacedContent = text.replace(regex, '<mark-down src="$1.md"></mark-down>');
  return replacedContent;
}

// Function to convert Wikimedia-style links to HTML links
function convertWikimediaLinks(text) {
  // Regular expression to match Wikimedia-style links
  var wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
  // Replace each match with the corresponding HTML link
  var convertedText = text.replace(wikiLinkRegex, function (match, p1) {
    return '<a href="#' + p1 + '">' + p1 + '</a>';
  });
  return convertedText;
}

// Custom HTML element for rendering markdown content
class MarkdownComponent extends HTMLElement {
  // Callback function called when the element is added to the document
  connectedCallback() {
    // Get the 'src' attribute value from the custom element
    this.src = this.getAttribute('src');

    // Check if 'src' attribute is not present
    if (this.src === null) {
      // If 'src' is not present, use the inner content of the custom element for rendering
      const content = this.innerHTML;
      this.render(content);
    } else {
      // If 'src' is present, fetch the content from the specified URL and then render it
      fetch(this.src)
        .then(res => res.text())
        .then(res => {
          this.render(res);
        });
    }
  }

  // Function to render markdown content
  render(content) {
    // Embed markdown content in a specific format
    const embeddedMarkdown = embedMarkdown(content);
    // Convert Wikimedia-style links to HTML links
    const wikimediaToHref = convertWikimediaLinks(embeddedMarkdown);
    // Parse and render the markdown content using the marked library
    this.innerHTML = marked.parse(wikimediaToHref);
  }
}

// Define the custom HTML element 'mark-down'
customElements.define('mark-down', MarkdownComponent);