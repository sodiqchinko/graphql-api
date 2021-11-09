const typeDefs = `

  type Apartment {
    uuid: ID!
    name: String!
    description: String
    owner: User!
    country: String
    state: String
    city: String
    postCode: String
    lat: Float
    lng: Float
    rooms: [Room!]
    roomCount: Int
  }
  type Favorite {
    user: User!
    apartment: Apartment!
  }
  type User {
    favoriteApartments: [Favorite!]
  }


  type ApartmentPagination{
    total: Int!
    results: [Apartment!] 
  }
  
  input CreateApartmentInput {
    name: String!
    description: String
    country: String
    state: String
    city: String
    postCode: String
    lat: Float
    lng: Float
  }

  input UpdateApartmentInput {
    uuid: ID!
    name: String!
    description: String
    country: String
    state: String
    city: String
    postCode: String
    lat: Float
    lng: Float
  }
  type Room {
    uuid: ID!
    apartment: Apartment!
    name: String!
    size: Int
    bathrooms: Int!
    price: Float!
  }

  input CreateRoomInput {
    apartment: ID!
    name: String!
    size: Int
    bathrooms: Int!
    price: Float!
  }
  input UpdateRoomInput {
    uuid: ID!
    apartment: ID!
    name: String!
    size: Int
    bathrooms: Int!
    price: Float!
  }
  
  input GeoLocation {
    lat: Float!
    lng: Float!
    distanceKM: Float!
  }
  

  type Query {
    apartments: ApartmentPagination!  @auth
    apartment(name: String!): Apartment!  @auth
    searchApartment(page: Int, city: String, state: String, country: String, noRooms: Int, geoLocation: GeoLocation ): ApartmentPagination!
  }
  type Mutation {
    createApartment(input: CreateApartmentInput!): Apartment @auth
    updateApartment(input: UpdateApartmentInput!): Apartment @auth
    deleteApartment(id: ID!): Apartment @auth
    markFavorite(id: ID!): Apartment @auth
    removeFavorite(id: ID!): Apartment @auth
    createRoom(input: CreateRoomInput!): Room @auth
    updateRoom(input: UpdateRoomInput!): Room @auth
    deleteRoom(id: ID!): Room @auth
  }
`;
export default typeDefs
