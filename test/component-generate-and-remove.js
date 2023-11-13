const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const { createNewComponent } = require('../generate-component.js'); // Replace 'your-module' with the actual module path

describe('createNewComponent', () => {
  // Define a test directory path for the component templates (replace with your actual path)
  const componentTemplatesPath = path.join(__dirname, 'component-templates');

  // A temporary directory to store test output
  const tempTestDir = path.join(__dirname, 'test-output');

  before(() => {
    // Create the temporary directory for testing
    fs.mkdirSync(tempTestDir);
  });

  after(() => {
    // Clean up the temporary directory after tests
    fs.rmdirSync(tempTestDir, { recursive: true });
  });

  it('should create a new component directory', () => {
    const componentName = 'test component';
    const componentId = 'test-component';

    createNewComponent(componentName, 'default');

    const componentPath = path.join(__dirname, 'components', componentId);
    expect(fs.existsSync(componentPath)).to.be.true;
  });

  it('should generate component files from the template', () => {
    const componentName = 'test component';
    const componentId = 'test-component';

    createNewComponent(componentName, 'default');

    const componentPath = path.join(__dirname, 'components', componentId);
    const componentFiles = fs.readdirSync(componentPath);

    // Check if the component files are generated
    expect(componentFiles).to.include.members([
      'metadata.json',
      `${componentId}-route.js`,
      `${componentId}.css`,
      `${componentId}.js`,
    ]);
  });

  it('should add import statements to index.css and index.js', () => {
    const componentName = 'test component';
    const componentId = 'test-component';

    createNewComponent(componentName, 'default');

    const cssImport = `@import "./components/${componentId}/${componentId}.css";`;
    const jsImport = `import "./components/${componentId}/${componentId}.js";`;

    const indexCssContent = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const indexJsContent = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

    expect(indexCssContent).to.include(cssImport);
    expect(indexJsContent).to.include(jsImport);
  });

  it('should add route import statement to routes.js', () => {
    const componentName = 'test component';
    const ComponentName = 'TestComponent';
    const componentId = 'test-component';

    createNewComponent(componentName, 'default');

    const routeImport = `const ${ComponentName} = require('./components/${componentId}/${componentId}-route.js')(app);`;

    const routesJsContent = fs.readFileSync(path.join(__dirname, 'routes.js'), 'utf8');

    expect(routesJsContent).to.include(routeImport);
  });
});
