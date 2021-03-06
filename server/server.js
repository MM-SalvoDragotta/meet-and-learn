const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
var compression = require('compression')

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');
const {
  GraphQLUpload,
  graphqlUploadExpress // A Koa implementation is also exported.
} = require("graphql-upload");

const PORT = process.env.PORT || 3001;

async function startServer() {
  const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  });

  await server.start();

  const app = express();
  app.use(graphqlUploadExpress());

  server.applyMiddleware({app});
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(compression({ filter: shouldCompress })) 
 
  function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
  }

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../client/build/index.html'));
  // });

  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "public", "index.html"));
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  })
}

startServer();
