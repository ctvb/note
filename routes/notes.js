const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the tips
//http://localhost:3000/api/tips/
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for tips`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
//http://localhost:3000/api/tips/
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title, text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

notes.delete('/:id', (req, res) => {
  readFromFile('./db/db.json').then((data) => {
    const parsedData = JSON.parse(data)
    const filteredData = parsedData.filter(filt => filt.id === req.params.id);
    filt.id.splice(req.params);
  });
});


module.exports = notes;

