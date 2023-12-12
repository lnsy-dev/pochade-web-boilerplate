/*

  fileClerk Server Code

  endpoint is available at /file-clerk 

*/
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;


// Exporting a function that takes an Express.js app as a parameter
module.exports = function (app) {
  // Setting up a route handler for POST requests on a dynamic endpoint (file-clerk)
  app.post('/save-file', async function (req, res) {
    if (!req.body.content || !req.body["file-id"]) {
        return res.status(400).json({ error: 'Both content and file-id are required in the request body' });
    }
    const file_id = req.body["file-id"];
    // Construct the file path based on the provided file_path
    const file_path = path.join(__dirname, '../../notebook',  file_id + '.md');
    // Write the content to the file
    fs.writeFile(file_path, req.body.content, 'utf8', (err) => {
      if (err) {
          return res.status(500).json({ error: 'Error saving the file' });
      }
      res.json({ message: 'File saved successfully' });
    });
  });

  app.get('/list-files', async function (req, res) {
    try {
      const files = await fsPromises.readdir(path.join(__dirname, '../../notebook'));
      res.json({ files });
    } catch (err) {
      res.status(500).json({ error: 'Error listing files' });
    }
  });

  app.post('/delete-file', async function (req, res) {
    if (!req.body["file-id"]) {
      return res.status(400).json({ error: 'file-id is required in the request body' });
    }
    const file_id = req.body["file-id"];
    const file_path = path.join(__dirname, '../../notebook', file_id + '.md');

    try {
      await fsPromises.unlink(file_path);
      res.json({ message: 'File deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting the file' });
    }
  });

  app.post('/load-file', async function (req, res) {
    if (!req.body["file-id"]) {
      return res.status(400).json({ error: 'file-id is required in the request body' });
    }
    const file_id = req.body["file-id"];
    const file_path = path.join(__dirname, '../../notebook', file_id + '.md');
    try {
      const content = await fsPromises.readFile(file_path, 'utf8');
      res.json({ content });
    } catch (err) {
      const new_file = 
`---
{"date-created":"${new Date()}",
"file-id": "${req.body["file-id"]}"}
---
        
`;
      await fsPromises.writeFile(file_path, new_file, 'utf8', (err) => {
        if (err) {return res.status(500)}
      });

      const content = await fsPromises.readFile(file_path, 'utf8');
      res.json({ content });

    }
  });

  app.post('/rename-file', async function (req, res) {
    const oldFileId = req.body["old-file-id"];
    const newFileId = req.body["new-file-id"];

    if (!oldFileId || !newFileId) {
      return res.status(400).json({ error: 'Both old-file-id and new-file-id are required in the request body' });
    }

    const oldFilePath = path.join(__dirname, '../../notebook', oldFileId + '.md');
    const newFilePath = path.join(__dirname, '../../notebook', newFileId + '.md');

    try {
      await fsPromises.rename(oldFilePath, newFilePath);
      res.json({ message: 'File renamed successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error renaming the file' });
    }
  });

  app.get('/file-exists', async function (req, res) {
    if (!req.query["file-id"]) {
      return res.status(400).json({ error: 'file-id is required in the query parameters' });
    }

    const file_id = req.query["file-id"];
    const file_path = path.join(__dirname, '../../notebook', file_id + '.md');

    try {
      // Check if the file exists
      const exists = await fsPromises.access(file_path, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);

      res.json({ exists });
    } catch (err) {
      res.status(500).json({ error: 'Error checking file existence' });
    }
  });

  app.get('/get-keys', async function (req, res) {
    const keysFilePath = path.join(__dirname, '../../.keys');

    try {
      const content = await fsPromises.readFile(keysFilePath, 'utf8');
      const keysArray = content.trim().split('\n');
      const keysObject = {};

      keysArray.forEach((line) => {
        const [key, value] = line.split('=');
        keysObject[key.trim()] = value.trim();
      });

      res.json({ keys: keysObject });
    } catch (err) {
      if (err.code === 'ENOENT') {
        // ENOENT error code indicates that the file does not exist
        res.json({ keys: {} }); // Return an empty object if the file doesn't exist
      } else {
        res.status(500).json({ error: 'Error reading or parsing keys file' });
      }
    }
  });

};