# lnsyEdit Web Application Documentation

## Overview

The lnsyEdit web application provides a Markdown editor interface with integrated features such as live preview, frontmatter parsing, and server interaction. This documentation explains the structure and functionality of the HTML and JavaScript code.

## HTML Structure

The HTML structure consists of several components and elements:

1. **Router Component (`<router-component>`):**
   - Manages routing within the application.
   - Detects changes in the URL parameters and triggers corresponding events.

2. **Header Section (`<header>`):**
   - Contains input for specifying the file path (`editor_route`) and buttons for loading (`load_button`) and saving (`save_button`) files.

3. **Two-Columns (`<two-columns>`):**
   - Divided into two columns:
      - Left column: `<lnsy-edit>` - Markdown editor.
      - Right column: `<div>` (`result_div`) - Display area for rendered Markdown content.

4. **JSON Editor (`<json-editor>`):**
   - Allows editing and displaying JSON metadata.

5. **Script Section:**
   - JavaScript code handles events, file loading, saving, and rendering Markdown content.

6. **Full-Screen Button (`<button>`):**
   - Allows toggling between full-screen and regular modes.

## JavaScript Functions

### `renderMarkdown(content)`

- Renders the Markdown content into the `result_div` using a custom `<mark-down>` element.

### `saveFile()`

- Gathers content from the Markdown editor (`lnsy_edit`), JSON editor (`json_editor`), and file path input (`editor_route`).
- Sends a POST request to the `/save-file` endpoint to save the content.
- Renders the saved Markdown content.

### `loadFile(file_path)`

- Sends a POST request to the `/load-file` endpoint to load content based on the provided file path.
- Parses and updates the JSON frontmatter in the JSON editor.
- Sets the cleaned content (without frontmatter) in the Markdown editor and renders it.

### `parseJSONFrontmatter(markdownContent)`

- Parses the JSON frontmatter from the Markdown content using regular expressions.
- Returns the parsed JSON object.

### `removeFrontMatter(content)`

- Removes YAML front matter from the content using regular expressions.
- Returns the content without front matter.

### Event Listeners

- **`load_button` Click Event:**
  - Calls `loadFile` to load content based on the specified file path.

- **`save_button` Click Event:**
  - Calls `saveFile` to save the content.

- **`lnsy_edit` Save Event:**
  - Calls `saveFile` when the `lnsy_edit` component dispatches a save event.

- **`window` Load Event:**
  - Loads a file specified in the URL parameters when the window loads.

- **`router_component` `paramsChanged` Event:**
  - Logs URL parameter changes.

### Full-Screen Button

- A dynamically created button (`fullScreenButton`) allows toggling between full-screen and regular modes.
- Utilizes the Fullscreen API for cross-browser compatibility.

## Styling

- Defines styles for the application, including background colors, padding, and colors for different sections.

## Conclusion

The lnsyEdit web application provides a user-friendly Markdown editing experience with integrated JSON metadata support. Users can load, edit, and save files seamlessly. The application's modular structure allows for easy customization and integration into various projects.

# lnsyEdit

LNSY Edit is a html webcomponent for editing Markdown, HTML, CSS and JS

## Useage

<lnsy-edit></lnsy-edit>

Use:

```html
  <lnsy-edit></lnsy-edit>
```

## Documentation

# lnsyEdit Web Component Documentation

## Overview

The `lnsy-edit` web component provides a customizable text editor interface for Markdown content. It utilizes the CodeMirror library to enhance the editing experience with features such as syntax highlighting, auto-close tags, and line wrapping. Additionally, the component allows users to save their edits using a customizable keyboard shortcut (`Ctrl + S`).

## Usage

### Creating an Instance

```html
<lnsy-edit></lnsy-edit>
```

### Events

The component dispatches a `save` event when the user presses `Ctrl + S`. You can listen for this event and handle the saved content.

```js
const lnsyEdit = document.querySelector('lnsy-edit');

lnsyEdit.addEventListener('save', (event) => {
  const savedContent = event.detail.content;
  const timestamp = event.detail.timestamp;
  // Handle the saved content
});
```

## Configuration

The `lnsy-edit` component supports the following configuration options:

- `lineNumbers`: Set to `false` to hide line numbers.
- `mode`: Specify the language mode (e.g., 'markdown').
- `theme`: Set the CodeMirror theme for styling.
- `autoCloseTags`: Enable auto-closing of HTML tags.
- `lineWrapping`: Enable line wrapping for long lines.

Example:

```html
<lnsy-edit lineNumbers="false" mode="markdown" theme="lnsy-edit" autoCloseTags="true" lineWrapping="true"></lnsy-edit>
```

## Server-side Integration

The provided Node.js code serves as a server for the `lnsy-edit` component. It exposes three endpoints:

1. `/lnsy-edit`: Returns metadata stored in the `metadata.json` file.
2. `/save-file`: Saves the content to a specified file path.
3. `/load-file`: Loads content from a specified file path.

To integrate the server with your application, ensure the following:

- Adjust the import paths and dependencies as needed.
- Customize file paths and error handling based on your project structure and requirements.

## lnsyEdit Server Code Documentation

### Overview

The `lnsyEdit` server code serves as an Express.js middleware to handle requests related to the `lnsy-edit` component.

### Endpoints

#### `/lnsy-edit` (POST)

- **Description**: Returns metadata from the `metadata.json` file.
- **Response**: JSON object containing metadata.

#### `/save-file` (POST)

- **Description**: Saves content to a specified file path.
- **Request Body**:
  - `content`: The content to be saved.
  - `file_path`: The path where the content should be saved.
- **Response**: JSON object with a success message or an error message.

#### `/load-file` (POST)

- **Description**: Loads content from a specified file path.
- **Request Body**:
  - `file_path`: The path from which content should be loaded.
- **Response**: The content of the file or an error message.

### Configuration

- Adjust file paths and error handling based on your project structure and requirements.
- Ensure proper installation of required Node.js packages (`express`, `path`, `fs`).
- Integrate the server code into your existing Express.js application.

## Conclusion

The `lnsy-edit` web component, combined with the provided server code, offers a versatile solution for creating and managing Markdown content with a user-friendly interface. Customize the component and server integration to suit the specific needs of your project.