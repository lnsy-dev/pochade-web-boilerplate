/*
  controlPanel
  
  Usage: 
  <control-panel></control-panel>

  See https://javascript.info/custom-elements for more information
*/

import {datalist} from './control-panel-commands.js';
async function getKeys(){
  return await fetch('/get-keys')
    .then(res => res.json())
    .then(res => res.keys)
}



class controlPanel extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback(){
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
    document.addEventListener('keydown', (event) => {
      if ((event.key === 'p' || event.key === 'P') && (event.ctrlKey || event.metaKey)) {
        const lnsy_edit = document.querySelector('lnsy-edit');
        this.cursor_position = lnsy_edit.getCursorPosition();
        this.showPanel();
        // Your code to handle Ctrl + P goes here
      }
    });

    this.createDataList();
  }

  createDataList(){

    this.datalist = document.createElement('datalist');
    this.datalist.setAttribute('id', 'control-panel-datalist');

    const dataList_content = datalist.map(d => {
      return `<option value="${d.name}"/>`
    }).join('');

    this.datalist.innerHTML = dataList_content;
    this.appendChild(this.datalist);
  }

  async submitCommand(value){
    const lnsy_edit = document.querySelector('lnsy-edit');
    const command = datalist.find(d => d.name === value);
    if(command){
      const keys = await getKeys();

      keys.ID = crypto.randomUUID();
      const template = command.render(keys);

      lnsy_edit.insertTextAtPosition(template, this.cursor_position);
      this.simple_modal.remove();
      lnsy_edit.focus();

    } else {
      console.log('no command found');
    }
  }

  showPanel(){
    const simple_modal = this.simple_modal = document.createElement('dialog');
    simple_modal.setAttribute('open', true);
    simple_modal.innerHTML = `
      <form method="dialog" class="close-form">
        <button>x</button>
      </form>
    `
    this.panel_input = document.createElement('input'); 
    this.panel_input.setAttribute('name', 'panel-input');
    this.panel_input.setAttribute('list', 'control-panel-datalist');
    simple_modal.appendChild(this.panel_input);
    this.appendChild(simple_modal);

    this.panel_input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        console.log(this.panel_input)
        this.submitCommand(this.panel_input.value); 
      }

      if (event.key === 'Escape' || event.keyCode === 27) {
        this.simple_modal.remove();
        // Your code to handle the Escape key goes here
      }
    });



    this.panel_input.focus();

  }
}

customElements.define('control-panel', controlPanel);