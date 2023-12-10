import "//unpkg.com/3d-force-graph";
import { CSS2DRenderer, CSS2DObject } from '//unpkg.com/three/examples/jsm/renderers/CSS2DRenderer.js';

function parseTextToJSON(inputText) {
  const lines = inputText.trim().split('\n');
  const nodes = [];
  const links = [];

  lines.forEach((line) => {
    const [source, target] = line.match(/\[([^\]]+)\]/g).map((node) => node.slice(1, -1));

    if (!nodes.some((node) => node.id === source)) {
      nodes.push({ id: source });
    }

    if (!nodes.some((node) => node.id === target)) {
      nodes.push({ id: target });
    }

    links.push({ source, target });
  });

  return { nodes, links };
}



class ForceGraphComponent extends HTMLElement {
  connectedCallback() {

    /* Get the CSS Values for styling */
    const style = window.getComputedStyle(this, null);

    this.backgroundColor = style.backgroundColor;
    this.foregroundColor = style.color;

    this.width = this.getAttribute('width');
    if (this.width === null) {
      this.width = window.innerWidth / 2;
    }

    this.height = this.getAttribute('height');
    if (this.height === null) {
      this.height = window.innerHeight / 1.3
    }
    this.init();
  }

  drawOverlay(node) {
    force_graph_overlay.innerHTML = `
      <h3>${node.id}</h3>
    `
  }

  focusOnNode(node) {
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    const newPos = node.x || node.y || node.z ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio } : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

    this.Graph.cameraPosition(
      newPos, // new position
      node, // lookAt ({ x, y, z })
      3000 // ms transition duration
    );

    // [...document.querySelectorAll('.node-label')].forEach(n => {
    //   n.classList.remove('selected');
    // });

    // document.querySelector(`#node-${node.id}`).classList.add('selected')

  }

  async init() {

    const graph_data = parseTextToJSON(this.innerText);
    console.log(graph_data);

    this.Graph = ForceGraph3D({ controlType: 'orbit', extraRenderers: [new CSS2DRenderer()] })
      (this)
      .width(this.width)
      .height(this.height)
      .backgroundColor(this.backgroundColor)
      .linkColor('white')
      .linkOpacity(1)
      .linkDirectionalParticles(5)
      .linkWidth(0)
      .graphData(graph_data)
      // .jsonUrl(this.src)
      // .nodeVal(node => {
      //   return node.size
      // })
      .nodeThreeObject(node => {
        const group = new THREE.Object3D();

        const material = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          shininess: 200,
          opacity: 0.4,
          transparent: true,
        });

        const geometry = new THREE.SphereGeometry(2);
        const cube = new THREE.Mesh(geometry, material);
        const nodeEl = document.createElement('div');
        nodeEl.textContent = node.id;
        nodeEl.className = 'node-label';
        nodeEl.id = `node-${node.id}`
        const label = new CSS2DObject(nodeEl);
        group.add(cube);

        group.add(label);

        return group
      })
      // .onNodeHover((node, prevNode) => {
      //   if(prevNode !== null){
      //     document.querySelector(`#node-${prevNode.id}`).classList.remove('hovered');
      //   }

      //   if(node !== null){
      //     document.querySelector(`#node-${node.id}`).classList.add('hovered');
      //   }

      // })
      .cooldownTicks(100)
      .nodeThreeObjectExtend(false)
      .zoomToFit(10, 10, node => true)
      .onNodeClick((node, event) => {
        this.focusOnNode(node);
        // this.drawOverlay(node);
      });

    let loaded = false;

    this.Graph.onEngineStop(() => {
      if (!loaded) {
        let { nodes, links } = this.Graph.graphData();
        this.focusOnNode(nodes[0]);
        loaded = true;
      }
    });

    this.overlay = document.createElement('div');
    this.overlay.setAttribute('id', 'force-graph-overlay');
    this.appendChild(this.overlay);

  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value) {
    switch (name) {
      default:
    }
  }
}

customElements.define('graph-data', ForceGraphComponent)