const express = require('express');
const { seedElements, getElementById, createElement, updateElement, getIndexById } = require('./utils');

let expressions = [];
seedElements(expressions, 'expressions');

const expressionsRouter = express.Router();



// Get all expressions
expressionsRouter.get('/', (req, res, next) => {
  res.send(expressions);
});

module.exports = expressionsRouter;