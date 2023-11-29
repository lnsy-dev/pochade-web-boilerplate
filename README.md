# Pochade AI Authoring Environment

![alt text](/pochade.png)
## A Beautiful Boilerplate for AI generated Projects

### What is a Pochade?

https://www.youtube.com/watch?v=OHMCh6aEaLU

## Overview

A boilerplate for node.js projects with some helper scripts for vanilla HTML, JS and CSS projects. This project is alpha. 

It also has a few helper scripts that allow you to create Elements hooked up to the server quickly. 

## Getting Started

clone this repo and npm install

```sh
git clone git@github.com:lnsy-ja/pochade-web-boilerplate.git
npm install
npm start
```

To create a new component go to:

[Editor](http://localhost:3000/lnsy-edit/lnsy-edit.html?&file_path=index.md)

[New Component](http://localhost:3000/dev-components/generate-new-component/generate-new-component.html)



## Creating a New Component

Go to the New component Page. It is located at http://localhost:3000/dev-components/generate-new-component/generate-new-component.html


More information about HTML element: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements

```sh
npm run new-component
```

This will ask you to enter the name of your element, and then it will generate a new element from the selected template.

This will create a folder in /components with your new component. 

It will also add this component to the routes.js, index.css and index.js files. 

### About Component Names

Each component name is composed of Two words. If you submit a single word the script will add -component at the end. This is to ensure compatibility with the HTML custom elements spec. 


## Deleting a Component

```sh
npm run delete-component
```

Enter the two word component name, so if you want to delete mark-down component, use "mark down"


## Build the Front End
For building for deployment we use webpack. 

Do: 

```sh
npm run build
```

This will create a bundle.js file in the folder /dist

if you wish to change the name of the bundle.js file create a .env file and set the PROJECT_NAME variable like so: 

```
PROJECT_NAME=new_bundle_name
```

