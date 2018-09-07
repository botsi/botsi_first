const express = require('express');
const app = express();

// Serves Express Yourself website
app.use(express.static('public'));

const {
  getElementById,
  getIndexById,
  updateElement,
  seedElements
} = require('./utils');

const expressions = ['eins', 'zwei'];
seedElements(expressions, 'expressions');

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));

app.get('/expressions', (req, res, next) => {
  res.send(expressions + ' okok');
});

app.get('/expressions/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

app.put('/expressions/:id', (req, res, next) => {

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
