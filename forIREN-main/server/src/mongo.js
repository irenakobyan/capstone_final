const mongoose = require('mongoose');
require('dotenv').config({
  path: '.env',
});


mongoose.connect('mongodb://localhost:27017/blah', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.set('debug', true);

const { connection } = mongoose;

connection.once('open', () => {
  console.log('Mongodb database connection established successfully.');
});
