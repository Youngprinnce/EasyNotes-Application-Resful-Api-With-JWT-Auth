require('dotenv').config();
const mongoose = require('mongoose');
const dsn = process.env.DB_USER;

mongoose.Promise = global.Promise;

const InitiateMongoServer = () => {
  mongoose
    .connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to DB');
    })
    .catch((err) => {
      console.err(err.message);
      process.exit();
    });
};

module.exports = InitiateMongoServer;
