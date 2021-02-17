'use strict';

// eslint-disable-next-line import/no-unresolved
const express = require('express');
var ml = require('ml-sentiment')();
const app = express();

// Routes
app.get('/:text', (req, res) => {
  let text = req.params.text
  if (text.includes("pizza")) {
    res.send("<h1 style='text-align: center;'>Andrew Loves Pizza!</h1><br><img src='https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80' /> ")
  }
  let ml_res = ml.classify(text);
  console.log(ml_res);
  if (ml_res > 1) {
    res.send("<h1>You have a good mood</h1>")
  } else if (ml_res < 0) {
    res.send("<h1>You have a bad mood</h1>")
  } else {
    res.send("<h1>You have a neutral mood</h1>")
  }

});

app.get('/*', (req, res) => {
  res.send("<h1>Put your message after the slash (/) to display your current mood!</h1>")
});

// Error handler
app.use((err, req, res) => {
  console.error(err);
  res.status(500).send('Internal Serverless Error');
});

// Allow CORS
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


module.exports = app;