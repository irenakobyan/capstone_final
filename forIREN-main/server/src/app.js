require('dotenv').config({
  path: '.env',
});

require('./mongo');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}


const users = require('./users/users.controller');
const auth = require('./auth/auth.controller');
const cafes = require('./cafes/cafes.controller');
const reviews = require('./reviews/reviews.controller');


const {
  handleError,
} = require('./common/middlewares/error-handler.middleware');
const { jwtMiddleware } = require('./common/middlewares/auth.middleware');

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
//app.use(cors());
app.use(cors(corsOptions));


app.use(
  jwtMiddleware.unless({
    path: ['/auth/login','/cafes/login', '/cafes/filter', '/users', '/cafes', { url: '/users', methods: ['POST'] },  { url: '/cafes', methods: ['POST'] }],
  })
);

app.use('/users', users);
app.use('/auth', auth);
app.use('/cafes', cafes);
app.use('/reviews', reviews);

app.get('/', (req, res) => {
  res.status(200).send('Success');
});

app.use(handleError);
module.exports = app;
