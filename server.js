import {ApolloServer} from "apollo-server";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import depthLimit from 'graphql-depth-limit';
import dotenv from "dotenv";
import {sequelize} from "./src/models/index.js";
import typeDefs from "./src/schema/types";
import resolvers from "./src/schema/resolvers";
import {getUser} from "./src/helpers/authentication";
import {authDirectiveTransformer} from "./src/schema/types/directives/authenticated";

const {makeExecutableSchema} = require('@graphql-tools/schema');

dotenv.config();

// Create the base executable schema
let schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// Transform the schema by applying directive logic
schema = authDirectiveTransformer(schema, 'auth');

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],

    validationRules: [depthLimit(10)],
    context: async context => {
        return {
            models: sequelize.models,
            user: await getUser(context),
            ...context
        }
    }
});

server.listen({
    port: process.env.PORT
}).then(async ({url}) => {
    console.log(`YOUR API IS RUNNING AT: ${url} :)`);
});
