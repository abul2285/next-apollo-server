import { gql } from "apollo-server-micro";

export default gql`
  extend type User {
    token: String!
  }

  input singupInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  extend type Mutation {
    login(email: String!, password: String!): User!
    signup(input: singupInput): User!
    logout: String!
  }
`;
