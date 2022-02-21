const express = require('express');
const event = require('./api/event');

const app = express();

// applied on any requests passed to the router
app.use(express.json());

// health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/health2', health);

function health(req, res) {
  res.status(200).json({ "message": "Okay" });
}

// only requests to /event/* will be sent to the router
app.use('/event', event);


module.exports = app;
