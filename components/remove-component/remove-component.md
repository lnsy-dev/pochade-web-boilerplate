# Remove Component

## Introduction

The Node.js Component Removal script facilitates the removal of a component and its associated import statements from the project. It ensures the cleanup of files, including the removal of the component folder and relevant import statements in the project's CSS, JavaScript, and route files.

## Prerequisites

Before using the script, ensure that Node.js is installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).

## Installation

1. Download the script file (`removeComponent.js`) and place it in your project directory.
2. Ensure that you have a `components` folder in your project directory to store components.
3. Run the script using the command:

    ```bash
    node removeComponent.js
    ```

4. Follow the prompts to enter a two-word name for the component you want to remove.

## Functionality

### 1. Naming Conventions

The script enforces the following naming conventions:

- **Folder Name:** The folder name is converted to dash-case (e.g., "My Component" becomes "my-component").
- **Component Name:** The component name is converted to CamelCase (e.g., "my-component" becomes "MyComponent").

### 2. Component Removal

The script removes the specified component folder from the `components` directory using Node.js's `fs.rm` method with the recursive option.

### 3. Import Statement Removal

The script generates import statements based on the removed component's information and removes these statements from the project's files:

- **CSS Import:** Removes `@import "./components/my-component/my-component.css";` from `index.css`.
- **JavaScript Import:** Removes `import "./components/my-component/my-component.js";` from `index.js`.
- **Route Import:** Removes `const MyComponent = require('./components/my-component/my-component-route.js')(app);` from `routes.js`.

### 4. Customization

You can customize the script by modifying the import statement generation and removal logic to match your project's file structure or naming conventions.

## Examples

### Basic Usage

```bash
node removeComponent.js
```

This will prompt you to enter a two-word name for the component you want to remove and execute the removal process.

### Script Integration

You can integrate the script into other Node.js modules by requiring the `removeComponent` function:

```javascript
const componentRemover = require('./removeComponent');
componentRemover.removeComponent('My Example Component');
```

This allows you to programmatically remove components within your application.

## Conclusion

The Node.js Component Removal script provides an easy and automated way to remove components from your web application. It enforces naming conventions, removes the component folder, and cleans up import statements in relevant project files. The script contributes to maintaining a clean and organized codebase by automating the removal process.