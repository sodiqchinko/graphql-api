const typeDefs = `
    type AuthPayload {
        token: String!
        user: User!
    }
    
  input SignUpUserInput {
    email: String!
    password: String!
    name: String!
    accountType: AccountType!
  }
    
    type Mutation {
        signUp(input: SignUpUserInput!): AuthPayload
        login(email: String!, password: String!): AuthPayload
    }
`;
export default typeDefs
