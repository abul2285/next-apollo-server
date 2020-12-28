import { gql } from "apollo-server";

export default gql`
  directive @auth(requires: Role!) on FIELD_DEFINITION
  directive @decorate(decoration: String) on FIELD_DEFINITION
  enum Role {
    ADMIN
    OWNER
    USER
  }
  type Message {
    id: ID
    receiverId: ID
    senderId: ID
    text: String
  }
  type User {
    id: ID
    firstName: String @decorate(decoration: "upper")
    lastName: String
    email: String
    role: Role @auth(requires: ADMIN)
    message(id: ID!): Message @auth(requires: OWNER)
  }
  extend type Query {
    currentUser: User @auth(requires: USER)
  }
`;
