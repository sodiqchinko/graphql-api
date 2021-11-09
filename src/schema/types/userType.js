const typeDefs = `
  
  type User {
    uuid: ID!
    name: String!
    email: String!
    accountType: AccountType!
  }

 
  type UserPagination{
    total: Int!
    results: [User!] 
  }

  type Query {
    users(search: String, page: Int, limit: Int): UserPagination @auth
    user(id: ID!): User  @auth
  }


  enum AccountType {
    TENANT
    LANDLORD
  }
`;
export default typeDefs
