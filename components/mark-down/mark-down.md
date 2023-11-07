# Markdown Component

The Markdown Component is a custom web component built using JavaScript that allows you to easily render and display Markdown content on a web page. This component is designed to be flexible and can accept Markdown content from either an attribute or an external file specified in the src attribute. It utilizes the marked library for parsing and rendering Markdown content.


<mark-down></mark-down>

Use:

```html
	<script src="path/to/markdown-component.js"></script>

	<mark-down src="path/to/remote/markdown-file.md"></mark-down>
	<mark-down>**Markdown content goes here**</mark-down>

```

## Attributes
**src:** (optional)
**Type:** String
**Default:** null
**Description:** This attribute specifies the source URL of an external Markdown file. If this attribute is present, the component will fetch the content from the specified URL and render it. If the src attribute is not provided, the component will render the Markdown content inside the <mark-down> element.

## Methods

The Markdown Component doesn't expose any public methods, but it automatically processes and renders Markdown content when the connectedCallback is invoked.

