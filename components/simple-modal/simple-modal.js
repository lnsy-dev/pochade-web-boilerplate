/*
  simpleModal
  
  Usage: 
  <simple-modal></simple-modal>

  See https://javascript.info/custom-elements for more information
*/

class simpleModal extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback(){
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
    
    const dialog_content = this.innerHTML;
    this.innerHTML = `<dialog open>
      <div class="content">${dialog_content}</div>

      <form method="dialog" class="close-form">
        <button>x</button>
      </form>
    </dialog>`;


    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        this.remove();
        // Your code to handle the Escape key goes here
      }
    });

    // get the first input and focus on it
    const first_input = this.querySelector('input');
    if(first_input){
      first_input.focus();
    }

  }
}

customElements.define('simple-modal', simpleModal);