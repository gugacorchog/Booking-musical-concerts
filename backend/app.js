const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose');
require('dotenv').config()

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');
const { wrap } = require('module');

const app = express();

if ( process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "./frontend/build")))
}

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);wrap

mongoose
  .connect(
      
    process.env.MONGO_URI

  )
  .then(() => {
    app.listen(3001);
  })
  .catch(err => {
    console.log(err);
  });

