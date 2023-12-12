class RouterComponent extends HTMLElement {
  connectedCallback(){
    this.values = this.getURLValues();
    
    window.addEventListener("hashchange", () => {
      let new_hash_value = window.location.hash.substring(1);
      const hash_changed_event = new CustomEvent('hashChanged', {
        detail: {
          hash: new_hash_value,
          timestamp: new Date().toISOString()
        }
      });
      this.dispatchEvent(hash_changed_event);
    });

    window.addEventListener('popstate', (e) => {
      const params_event = new CustomEvent('paramsChanged', {
        detail: {
          params: this.getURLValues(),
          timestamp: new Date().toISOString()
        }
      });
      this.dispatchEvent(params_event);
    });
  }

  getURLValues(URL = window.location.href ){
    const search_params = new URLSearchParams(URL)
    let options = {}
    for (const [key, unparsed_value] of search_params) {
      if(key !== window.location.origin + window.location.pathname + '?' ){
        try {
          const value = JSON.parse(decodeURI(unparsed_value))
          options[key] = value
        } catch {
          options[key] = decodeURI(unparsed_value)
        }
      }
    }
    return options
  }

  clearURLValues(){
    window.history.pushState({}, document.title, window.location.pathname);
  }

  setURLValues(obj){
    let url = window.location.origin + window.location.pathname + '?';
    Object.keys(obj).forEach(key => {
      url += `&${key}=${obj[key]}`
    });
    history.pushState(obj, '', url);
  }

  generateURLFromObject(obj){
    let url = window.location.origin + window.location.pathname + '?';
    Object.keys(obj).forEach(key => {
      url += `&${key}=${obj[key]}`;
    });

    return url;

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

customElements.define('router-component', RouterComponent)