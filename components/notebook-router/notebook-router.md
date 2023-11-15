# Notebook Router

Notebook Router listens to the hashchange event in the browser, and when it changes loads another markdown snippet from the id. 

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