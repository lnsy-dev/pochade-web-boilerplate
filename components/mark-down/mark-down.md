# Markdown Component with Hashtag Navigation

This documentation explains the functionality of the provided JavaScript code, which defines a custom HTML element called `mark-down` for rendering Markdown content and another custom element called `hash-tag` for handling hashtag navigation.

## Dependencies

The code relies on the [Marked](https://marked.js.org/) library for rendering Markdown content. Make sure to include the library using the following CDN link:

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

## `wrapHashtags(text)`

This function takes a string `text` as input and wraps hashtags in the format `<hash-tag>...</hash-tag>`. It uses a regular expression to find hashtags (words starting with #) and replaces them with the specified format.

## `setURLValues(obj)`

This function takes an object `obj` as input and updates the URL with the provided key-value pairs. It constructs a new URL based on the current origin, pathname, and the input object. The updated URL is then pushed to the browser's history using `history.pushState`.

## `convertObsidianLinks(text)`

This function takes a string `text` as input and converts Obsidian-style wiki links (`[[...]]`) to HTML links. It uses a regular expression to match and replace each wiki link with an HTML link pointing to an anchor with the same name.

## `MarkdownComponent` Class

This class defines a custom HTML element `mark-down`. It extends the `HTMLElement` class and has a `connectedCallback` method that is called when the element is inserted into the DOM. If the `src` attribute is present, it fetches the Markdown content from the specified URL; otherwise, it renders the content present inside the element. The rendering process involves converting Obsidian-style links, wrapping hashtags, and then parsing the Markdown content using the Marked library.

## `HashTag` Class

This class defines a custom HTML element `hash-tag`. It extends the `HTMLElement` class and has a `connectedCallback` method that adds a click event listener. When a `hash-tag` element is clicked, it updates the URL with a `file_path` query parameter, which is set to the inner text of the `hash-tag` element (appended with '.md'). This is useful for navigation based on hashtags.

### Observed Attributes

The `observedAttributes` static method defines which attributes should be observed for changes. In this case, there are no observed attributes.

### Attribute Changed Callback

The `attributeChangedCallback` method is present to handle changes in observed attributes, although there are currently no specific cases defined.

## Usage

To use the `mark-down` and `hash-tag` elements, include the provided JavaScript code in your project and make sure to include the Marked library. Then, use the elements in your HTML as follows:

```html
<mark-down src="path/to/markdown-file.md"></mark-down>
<hash-tag>example</hash-tag>
```

These elements will handle rendering Markdown content and updating the URL with hashtag navigation, respectively.