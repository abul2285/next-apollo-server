import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    people: [Person]
    hi: String!
  }

  type Friend {
    name: String!
    age: Int!
  }

  type Person {
    name: String
    age: Int
    friends: [Friend!]!
    paginatedFriends(numPages: Int): [Friend!]!
  }
`;
