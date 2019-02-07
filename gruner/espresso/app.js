const express = require('express');
const app = express();


const {
  getElementById,
  getIndexById,
  updateElement,
  seedElements,
  createElement
} = require('./utils');

let expressions = [];
seedElements(expressions, 'expressions');


const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));


const expressionsRouter = require('./public/expressions.js');

app.use('/expressions', expressionsRouter);


console.log('hallo david', expressionsRouter.get);

// Add your POST handler below:


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
