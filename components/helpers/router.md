# Router Component Documentation

## Introduction

The `RouterComponent` is a custom HTML element in JavaScript designed to handle URL changes, specifically changes to the hash fragment and query parameters. It provides methods for retrieving, clearing, and setting URL values. Additionally, it dispatches custom events when the hash fragment or query parameters change.

## Installation

To use the `RouterComponent`, include the JavaScript file in your HTML:

```html
<script src="path/to/router-component.js"></script>
```

Ensure that the file path is correct relative to your HTML file.

## Usage

### Creating an Instance

To use the `RouterComponent`, create an instance of it in your HTML:

```html
<router-component></router-component>
```

### Events

The `RouterComponent` dispatches custom events when the hash fragment or query parameters change:

- **`hashChanged`**: Dispatched when the hash fragment changes.
  - Detail:
    - `hash`: The new hash fragment value.
    - `timestamp`: The timestamp of the event.

- **`paramsChanged`**: Dispatched when the query parameters change.
  - Detail:
    - `params`: An object containing the updated query parameters.
    - `timestamp`: The timestamp of the event.

To listen for these events, add event listeners in your JavaScript code:

```js
const router = document.querySelector('router-component');

router.addEventListener('hashChanged', (event) => {
  console.log('Hash changed:', event.detail.hash);
  console.log('Timestamp:', event.detail.timestamp);
});

router.addEventListener('paramsChanged', (event) => {
  console.log('Query parameters changed:', event.detail.params);
  console.log('Timestamp:', event.detail.timestamp);
});
```

### Methods

#### `getURLValues(URL)`

This method retrieves the query parameters from the current URL or a specified URL.

- **Parameters**:
  - `URL` (optional): The URL from which to retrieve the query parameters. Defaults to the current URL.

- **Returns**:
  - An object containing the query parameters.

#### `clearURLValues()`

This method clears all query parameters, updating the URL without reloading the page.

#### `setURLValues(obj)`

This method sets the query parameters based on the provided object, updating the URL without reloading the page.

- **Parameters**:
  - `obj`: An object containing key-value pairs representing the query parameters.

### Example

```js
const router = document.querySelector('router-component');

// Get current query parameters
const currentParams = router.getURLValues();
console.log('Current query parameters:', currentParams);

// Set new query parameters
router.setURLValues({ page: 'home', category: 'news' });

// Clear query parameters
router.clearURLValues();
```

## Compatibility

The `RouterComponent` relies on the `window.history` API and is compatible with modern browsers that support custom elements and the `URLSearchParams` interface.

## Conclusion

The `RouterComponent` simplifies URL management in web applications, making it easy to react to changes in the hash fragment and query parameters. Use the provided methods and events to integrate this component into your application's routing system.