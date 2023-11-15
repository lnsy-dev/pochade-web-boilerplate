# Notebook Router

Notebook Router listens to the hashchange event in the browser, and when it changes loads another markdown snippet from the id. 

## To Build
-[ ] searches the root directory for file
-[ ] If it cannot find the file from hash in root directory, search the project recursively in the server and return the first item with that ID (this can be in the notebooks or the components folder)
-[ ] if Server is not available return cannot find page


<notebook-router></notebook-router>

Use:

```html
	<notebook-router></notebook-router>
```
