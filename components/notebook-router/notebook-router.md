# Notebook Router

Notebook Router listens to the hashchange event in the browser, and when it changes loads another markdown snippet from the id. 

# JavaScript Custom HTML Element Documentation

## `notebook-router` Custom Element

The `notebook-router` is a custom HTML element designed to handle routing based on the hash part of the URL. It provides a simple way to load and display Markdown content dynamically. This element extends the functionality of the native `HTMLElement` class.

### Usage

```html
<notebook-router></notebook-router>
```

### Introduction

The `notebook-router` custom element is designed to be used as a routing component in a web application. It listens for changes in the URL hash and dynamically loads and displays Markdown content based on the hash value. The loaded content is then rendered using a custom `<mark-down>` element.

### Methods

#### `init()`

- **Description:** Initializes the `notebook-router` by setting up an event listener for hash changes and loading content based on the current hash.
- **Usage:** Automatically called when the element is connected to the document.

#### `handleNewHash(hash)`

- **Parameters:**
  - `hash` (string): The hash value from the URL.
- **Description:** Handles a change in the URL hash by loading and displaying the corresponding Markdown content. If the hash is empty, it defaults to 'index'.
- **Usage:** Automatically called when the hash changes.

#### `fetchData(filename)`

- **Parameters:**
  - `filename` (string): The name of the Markdown file to fetch.
- **Description:** Fetches the content of a Markdown file using the provided filename.
- **Returns:** A Promise that resolves to the content of the Markdown file.
- **Usage:** Used internally to fetch Markdown content.

### Events

- **`hashchange` event:**
  - **Description:** Triggered when there is a change in the URL hash.
  - **Usage:** Used to update the displayed content based on the new hash.

### Lifecycle Callbacks

#### `connectedCallback()`

- **Description:** Called when the element is added to the document. Initializes the component and sets up event listeners.

#### `disconnectedCallback()`

- **Description:** Called when the element is removed from the document. Performs cleanup tasks.

#### `adoptedCallback()`

- **Description:** Called when the element is moved to a new document. Rarely used.

### Static Properties

#### `observedAttributes`

- **Type:** Array
- **Description:** Specifies an array of attribute names to observe for changes. Currently empty as the element does not observe any attributes.

### Attribute Change Callback

#### `attributeChangedCallback(name, old_value, new_value)`

- **Description:** Called when observed attributes change. Currently does not handle any specific attributes.

### Example Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notebook Router Example</title>
</head>
<body>
  <notebook-router></notebook-router>

  <script src="path/to/notebook-router.js"></script>
</body>
</html>
```

In this example, the `notebook-router` element is added to the body of the HTML document. The associated JavaScript file (`notebook-router.js`) contains the implementation of the `notebookRouter` class.

## To Build
-[ ] searches the root directory for file
-[ ] If it cannot find the file from hash in root directory, search the project recursively in the server and return the first item with that ID (this can be in the notebooks or the components folder)
-[ ] if Server is not available return cannot find page
- [ ] if file does not exist, create it in notebook folder


<notebook-router></notebook-router>

Use:

```html
	<notebook-router></notebook-router>
```


Potential code from Chat GPT:

Prompt: assuming node.js, write a script that efficiently does a recursive search of a folder looking for a specific file



Certainly! Below is an example of a simple Node.js script that performs a recursive search for a specific file within a folder. This script uses the `fs` (file system) module and `path` module for file and path operations. It utilizes asynchronous functions to avoid blocking the event loop during the search.

```javascript
const fs = require('fs');
const path = require('path');

function searchFile(startDir, targetFileName) {
  // Define a recursive function to search for the file
  function search(currentDir) {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // If it's a directory, recurse into it
        search(filePath);
      } else if (file === targetFileName) {
        // If the file is found, log its path and return
        console.log('File found at:', filePath);
        return;
      }
    }
  }

  // Start the search from the specified directory
  search(startDir);
}

// Example usage:
const startDirectory = '/path/to/your/directory';
const targetFile = 'example.txt';

searchFile(startDirectory, targetFile);
```

Replace `'/path/to/your/directory'` with the path to the directory you want to start the search from, and `'example.txt'` with the name of the file you are looking for.

Note that this script uses synchronous functions for simplicity. If you are working with large directories or want to maintain a non-blocking approach, you can modify the script to use asynchronous functions (`fs.readdir` and `fs.stat`) with callbacks or use `fs.promises` if you are using a Node.js version that supports it.