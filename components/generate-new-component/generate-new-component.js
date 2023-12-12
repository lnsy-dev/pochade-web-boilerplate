/*
  generateComponent
  
  Usage: 
  <generate-new-component></generate-new-component>

  See https://javascript.info/custom-elements for more information
*/


function checkFormValidity(form) {
  // Get all required elements
  const requiredElements = form.querySelectorAll('[required]');

  // Check if all required fields have a value
  for (const element of requiredElements) {
    if (!element.value.trim()) {
      return false;
    }
  }

  return true;
}


function getFormValues(form){
  const formValues = {};
  // Select all input, select, and textarea elements within the form
  const formElements = form.querySelectorAll('input, select, textarea');
  // Iterate through each form element
  formElements.forEach((element) => {
    // Check the type of the element
    if (element.type !== 'submit') {
      // Store the value of the element in the formValues object
      formValues[element.name] = element.value;
    }
  });
  // Return the collected form values
  return formValues;
}


/**
 * @param  {string} -- String to convert to Camel Case
 * @return {string} -- Converted string in CamelCase
 */

function toCamelCase(str) {
  return str.replace(/[-_ ](.)/g, function(match, group1) {
    return group1.toUpperCase();
  });
}

/**
 * @param  {string} -- String to convert to Dash Case
 * @return {string} -- Converted String in dash-case
 */
function toDashCase(str) {
  // Remove leading and trailing spaces
  str = str.trim();
  // Replace spaces with dashes
  str = str.replace(/\s+/g, '-');
  // Convert to lowercase
  str = str.toLowerCase();
  return str;
}


function generateSelectElement(values, default_value) {
  // Create a select element
  const selectElement = document.createElement('select');
  // Iterate over the array of values
  values.forEach((value) => {
    // Create an option element for each value
    const optionElement = document.createElement('option');
    if(value === default_value){
      optionElement.selected = true;
    }
    // Set the value and text of the option element
    optionElement.value = value;
    optionElement.text = value;
    // Append the option element to the select element
    selectElement.appendChild(optionElement);
  });
  // Return the generated select element
  return selectElement;
}

class generateComponent extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback(){
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
    this.init();
    this.innerHTML = `
      <h1>Generate Component</h1>
    `
  }

  addLabel(content, name){

    const label = document.createElement('label');
    label.setAttribute('for', name); 
    label.innerText = content; 
    this.form.appendChild(label);
  }

  async init(){
    this.form = document.createElement('form');

    this.addLabel('Select Template', 'template')
    const templates = await this.fetchData();
    const select = generateSelectElement(templates, 'default');
    select.setAttribute('name', 'template')

    this.form.appendChild(select);

    this.addLabel('Title (required)', 'title');
    const title = document.createElement('input');
    title.setAttribute('required', true);
    title.setAttribute('name', 'title'); 
    this.form.appendChild(title);

    const component_names = document.createElement('div');
    this.form.appendChild(component_names);

    this.addLabel('Description', 'description')
    const description = document.createElement('textarea');
    description.setAttribute('name', 'description');
    this.form.appendChild(description);

    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('disabled', true);
    submit.setAttribute('value', 'Create Component');
    this.form.appendChild(submit);

    submit.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleSubmit();      
    });

    title.addEventListener('change', (e) => {
      if(e.target.value.length > 0){
        let component_name = e.target.value;
        if (component_name.split(' ').length < 2) {
          component_name = component_name + ' Component';
        }

        const dash_case_name = toDashCase(component_name);
        const camel_case_name = toCamelCase(component_name);
        component_names.innerHTML = `
          <h2>component div will look like:</h2>
          <code>
&lt;${dash_case_name}&gt;&lt;/${dash_case_name}&gt;
          </code>
          <h2>Component Name will be</h2>
          <p>${camel_case_name}</p>

        `
        submit.removeAttribute('disabled');
      } else {
        submit.setAttribute('disabled', true);
      }
    });

    this.appendChild(this.form);

  }

  async handleSubmit(){
    const values = getFormValues(this.form);
    const res = this.createComponent(values); 

    const dash_case_name = toDashCase(component_name);

    this.innerHTML = `
      <h1>Created a new Component:</h1>
      <h3>Copy and paste this to create the new element:</h3>
      <code>&lt;${dash_case_name}&gt;&lt;/${dash_case_name}&gt;</code>
    `

  }

  async createComponent(values){
    const response = await fetch("/generate-new-component", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    });
    const data = response.json();
    return data;

  }

  async fetchData(post = {}){
    const response = await fetch("/get-component-templates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    return data;
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
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }
}

customElements.define('generate-new-component', generateComponent);
