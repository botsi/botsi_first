const express = require('express');

/*
const {
  seedElements,
  getElementById,
  createElement,
  updateElement,
  getIndexById
} = require('../utils');

const expressions = [];
seedElements(expressions, 'expressions');
*/

const expressionsRouter = express.Router();


expressionsRouter.get('/', (req, res, next) => {
  res.send(expressions);
});

expressionsRouter.get('/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

expressionsRouter.put('/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});


expressionsRouter.delete('/:id', (req, res, next) => {
  if (req.params.id) {
    expressions.splice(req.params.id, 1);
    res.status(202).send();
    console.log('new expressions.length is: ', expressions.length);
  } else {
    res.status(404).send();
  }
});

module.exports = expressionsRouter;
