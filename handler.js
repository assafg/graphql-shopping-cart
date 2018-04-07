const server = require('apollo-server-lambda');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports.graphqlHandler = server.graphqlLambda({ schema });
module.exports.graphiqlHandler = server.graphiqlLambda({
    endpointURL: 'api/query',
});
