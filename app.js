const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQl = require('express-graphql').graphqlHTTP
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');
const { wrap } = require('module');

const app = express();

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
  expressGraphQl({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);wrap

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-ntrwp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

