/*
  chatGpt
  
  Usage: 
  <chat-gpt></chat-gpt>

  See https://javascript.info/custom-elements for more information
*/


class chatGpt extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback(){
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
    
        
    if(this.value.length > 1){
      this.queryChatGPT(this.innerText);
    }
    this.innerHTML = `<notice>Querying Chat GPT...</notice>`
  }

  async queryHans(query){
    const pre_prompt = `
    You are an assistant named HANS. 
    Your job is to sell the DATAROOM software framework. Dataroom is a web framework 
    designed to share information between people safely. It focuses on security as interface.
    Dataroom uses HTML Standards and vanilla Javascript to bring the expressive power of the web to regular people. 
    Over 10 years of prototyping have gone into the framework
    It is open source, and looking for contributors. 

    The software is written to the affordances of the web -- it has a philosophy of minimalism.

    The primary goal is to get people to fund the development of this open source software. 


    Everything you write should be in a short 4 line poem.`

    const prompt = [{role: "user", content: pre_prompt + ' ' + query}]

    try {
      const response = await fetch("/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });

    const data = await response.json();
    this.innerHTML = `
      <mark-down>${data.content}</mark-down>
    `
    this.classList.remove('loading');
    return data;
    } catch(e){
      this.classList.add('error');
      this.innerText = "Error:" + JSON.stringify(e);
    }
  }

  async queryChatGPT(query){

    const prompt = [{role: "user", content: query}]

    console.log(prompt);
    try {
      const response = await fetch("/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });

    const data = await response.json();
    this.innerHTML = `
      <mark-down>${data.content}</mark-down>
    `
    this.classList.remove('loading');
    return data;
    } catch(e){
      this.classList.add('error');
      this.innerText = "Error:" + JSON.stringify(e);
    }
  }
  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  static get observedAttributes() {
    return ['prompt'];
  }

  attributeChangedCallback(name, old_value, new_value){
    if(new_value.length < 1) return

    switch(name){
    case "prompt":
      this.query = new_value;
      this.queryChatGPT(this.query);
      break;
    default:
    }
  }
}

class hansGPT extends chatGpt {
}

customElements.define('chat-gpt', chatGpt);
customElements.define('hans-gpt', hansGPT);