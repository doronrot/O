const express = require('express');
const { findEvents } = require('./utils');
const router = express.Router();
const events = [];

/**
 * get request with query param limit default set to 10
 * request must include query param timestamp
 */
router.get('/', (req, res) => {
  const params = req.query;
  const limit = params.limit || 10;
  const timestamp = params.timestamp;
  if (!timestamp) {
    res.status(400).send('Missing timestamp');
    return;
  }

  const foundEvents = findEvents({
    timestamp,
    limit,
    events,
  })
  res.status(200).json(foundEvents);
});

/**
 * post request with current timestamp and id, determined by events array size.
 * response is sent as json
 */
router.post('/', (req, res) => {
  const id = events.length;
  const name = req.body.name;
  const event = {
    id,
    name,
    timestamp: new Date().getTime()
  };
  events.push(event);
  res.json(event);
});


module.exports = router;
