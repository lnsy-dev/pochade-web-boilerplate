const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const { removeComponent } = require('../remove-component.js'); // Replace 'your-module' with the actual module path

describe('removeComponent', () => {
  // Define a test directory path for the component templates (replace with your actual path)
  const componentTemplatesPath = path.join(__dirname, 'component-templates');

  // A temporary directory to store test output
  const tempTestDir = path.join(__dirname, 'test-output');

  before(() => {
    // Create a temporary directory for testing
    fs.mkdirSync(tempTestDir);
  });

  after(() => {
    // Clean up the temporary directory after tests
    fs.rmdirSync(tempTestDir, { recursive: true });
  });

  it('should remove the component folder', () => {
    const componentName = 'test component';
    const componentId = 'test-component';

    // Create a temporary component folder for testing
    const componentPath = path.join(tempTestDir, 'components', componentId);
    fs.mkdirSync(componentPath);

    removeComponent(componentName);

    // Check if the component folder has been removed
    expect(fs.existsSync(componentPath)).to.be.false;
  });

  it('should remove the CSS import statement from index.css', () => {
    const componentName = 'test component';
    const componentId = 'test-component';

    // Create a temporary index.css file with the CSS import statement
    const indexCssPath = path.join(tempTestDir, 'index.css');
    fs.writeFileSync(indexCssPath, `@import "./components/${componentId}/${componentId}.css";`, 'utf8');

    removeComponent(componentName);

    // Check if the CSS import statement has been removed from index.css
    const indexCssContent = fs.readFileSync(indexCssPath, 'utf8');
    expect(indexCssContent).to.not.include(`@import "./components/${componentId}/${componentId}.css";`);
  });

  it('should remove the JavaScript import statement from index.js', () => {
    const componentName = 'test component';
    const componentId = 'test-component';

    // Create a temporary index.js file with the JavaScript import statement
    const indexJsPath = path.join(tempTestDir, 'index.js');
    fs.writeFileSync(indexJsPath, `import "./components/${componentId}/${componentId}.js";`, 'utf8');

    removeComponent(componentName);

    // Check if the JavaScript import statement has been removed from index.js
    const indexJsContent = fs.readFileSync(indexJsPath, 'utf8');
    expect(indexJsContent).to.not.include(`import "./components/${componentId}/${componentId}.js";`);
  });

  it('should remove the route import statement from routes.js', () => {
    const componentName = 'test component';
    const ComponentName = 'TestComponent';
    const componentId = 'test-component';

    // Create a temporary routes.js file with the route import statement
    const routesJsPath = path.join(tempTestDir, 'routes.js');
    fs.writeFileSync(routesJsPath, `const ${ComponentName} = require('./components/${componentId}/${componentId}-route.js')(app);`, 'utf8');

    removeComponent(componentName);

    // Check if the route import statement has been removed from routes.js
    const routesJsContent = fs.readFileSync(routesJsPath, 'utf8');
    expect(routesJsContent).to.not.include(`const ${ComponentName} = require('./components/${componentId}/${componentId}-route.js')(app);`);
  });
});
