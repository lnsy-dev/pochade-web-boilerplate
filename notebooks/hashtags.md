---
{"date-created":"Mon Nov 27 2023 20:27:19 GMT-0800 (Pacific Standard Time)"}
---
this code is found in /components/mark-down/mark-down.js

```js
class HashTag extends HTMLElement {
  connectedCallback(){
    this.addEventListener('click', (e) => {
     setURLValues({'file_path':this.innerText + '.md'});
    });
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }
}

customElements.define('hash-tag', HashTag)


```