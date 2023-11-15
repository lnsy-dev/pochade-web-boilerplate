# Generate Component

## To Run

```sh
	npm run new-component
```

## Introduction

The Node.js Component Generator is a script designed to facilitate the creation of new components for a web application. It follows a convention for organizing components and provides an interactive interface for user input. The generated components include associated files such as JavaScript files, CSS files, and a route file.

## Prerequisites

Before using the script, ensure that Node.js is installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).

## Installation

1. Download the script file (`createNewComponent.js`) and place it in your project directory.
2. Ensure that you have a `components` folder in your project directory to store the generated components.
3. Optionally, create a `component-templates` folder to hold different component templates.

## Usage

To create a new component, run the script using the following command:

```bash
node createNewComponent.js
```

The script will prompt you to enter a two-word name for the component. If a single-word name is provided, the script will append "-component" to it.

## Functionality

### 1. Naming Conventions

The script enforces the following naming conventions:

- **Folder Name:** The folder name is converted to dash-case (e.g., "My Component" becomes "my-component").
- **Component Name:** The component name is converted to CamelCase (e.g., "my-component" becomes "MyComponent").

### 2. Folder Structure

The script generates a new folder for the component in the `components` directory with the following structure:

```
/components
  /my-component
    my-component.js
    my-component.css
    my-component-route.js
    metadata.json
```

### 3. Template Replacement

The script reads component templates from the `component-templates` directory and replaces placeholders with the generated component's information:

- `${component-id}` is replaced with the dash-case version of the component name.
- `${ComponentName}` is replaced with the CamelCase version of the component name.

### 4. Import Statements

The script appends import statements to the project's `index.css`, `index.js`, and `routes.js` files:

- **CSS Import:** Adds `@import "./components/my-component/my-component.css";` to `index.css`.
- **JavaScript Import:** Adds `import "./components/my-component/my-component.js";` to `index.js`.
- **Route Import:** Adds `const MyComponent = require('./components/my-component/my-component-route.js')(app);` to `routes.js`.

## Customization

You can customize the script by adding your own component templates in the `component-templates` directory. Ensure that placeholders `${component-id}` and `${ComponentName}` are used in your template files to enable proper substitution.

## Examples

### Basic Usage

```bash
node createNewComponent.js
```

This will prompt you to enter a two-word name for the component and generate the necessary files and import statements.

### Script Integration

You can also integrate the script into other Node.js modules by requiring the `createNewComponent` function:

```javascript
const componentGenerator = require('./createNewComponent');
componentGenerator.createNewComponent('My Example Component');
```

This allows you to programmatically generate components within your application.

## Conclusion

The Node.js Component Generator simplifies the process of creating consistent and organized components for your web application. It enforces naming conventions, generates folder structures, and provides flexibility for customization through templates.