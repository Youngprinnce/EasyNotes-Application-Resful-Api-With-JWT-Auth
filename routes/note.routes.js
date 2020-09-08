const express = require('express');
const router = express.Router();
const note = require('../controller/note.controller');

//Middleware that API route has to pass through to verify that a certain user is authorized to use API
const getApiAccess = (req, res, next) => {
  if (req.headers.authorization.split(' ')[0] === 'JWT') {
    next();
  } else {
    res.status(400).json({ messsage: 'Unauthorized user! Use token to gain access' });
  }
};

module.exports = () => {
  router.get('/', note.welcome);

  router.get('/notes', getApiAccess, note.findAll);

  router.post('/notes', getApiAccess, note.create);

  router.get('/notes/:noteID', getApiAccess, note.findOne);

  router.put('/notes/:noteID', getApiAccess, note.update);

  router.delete('/notes/:noteID', getApiAccess, note.delete);

  return router;
};
