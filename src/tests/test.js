import {ApolloServer, gql} from "apollo-server";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import depthLimit from 'graphql-depth-limit';
import dotenv from "dotenv";
import {sequelize} from "../models/index.js";
import typeDefs from "../schema/types";
import resolvers from "../schema/resolvers";
import {getUser} from "../helpers/authentication";
import {authDirectiveTransformer} from "../schema/types/directives/authenticated";

const {createTestClient} = require("apollo-server-testing");

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
const {query, mutate} = createTestClient(server);

describe("Test cases", () => {
    // Before any tests run, clear the DB and run migrations with Sequelize sync()
    beforeAll(async () => {
        await sequelize.sync({force: true})
    });

    test("search apartments", async () => {
        const SEARCH_APARTMENT = gql`
            query{
              searchApartment{
                total
                results{
                  uuid
                  name
                  roomCount
                }
              }
            }
          `;

        const {
            data: {searchApartment}
        } = await query({query: SEARCH_APARTMENT});
        expect(searchApartment).toEqual({"results": [], "total": 0});
    });
    test("sign up response test case", async () => {
        const SIGN_UP = gql`
            mutation{
              signUp(input:{
                email:"test@user.com",
                password:"password",
                name: "Test User",
                accountType:TENANT
              }){
                token
                user{
                  uuid
                  name
                  email
                  accountType
                }
              }
            }
          `;

        const {
            data: {signUp}
        } = await mutate({mutation: SIGN_UP});

        expect(signUp?.user?.name).toEqual("Test User");
        expect(signUp?.user?.accountType).toEqual("TENANT");
        expect(signUp?.user?.email).toEqual("test@user.com");
    });
})
