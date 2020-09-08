require('dotenv').config();
const express = require('express');
const routes = require('./routes/note.routes');
const jwt = require('jsonwebtoken');
const InitiateMongoServer = require('./config/db');
const app = express();

const port = process.env.PORT;
const hostname = process.env.HOST || 4000;

//Connection to database
InitiateMongoServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes());

//JWT Vrification Code
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    jwt.verify(req.headers.authorization.split('')[1], 'SECUREAPPLICATION', (err, decode) => {
      console.log(decode.hello);
      next();
    });
  }
});

app.listen(port, hostname, () => {
  console.log(`App listening on http://${hostname}:${port}`);
});
