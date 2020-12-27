import { gql } from "apollo-server-micro";

export default gql`
  enum AuthType {
    GOOGLE
    GITHUB
    OUTLOOK
  }

  # A User (profile) is linked to some Accounts that carries all authentication information
  type Account {
    id: ID! # "!" indicate a non-null (mandatory) field
    authType: AuthType!
    email: String!
    token: String
    archived: Boolean!
    disabled: Boolean!
    verified: Boolean!
  }

  type User {
    id: ID!
    accounts: [Account!]! # (a non-null array of non-null Account values)
    givenName: String!
  }

  # a single query is exposed to list all users and filter by status and authType
  extend type Query {
    users(first: Int!, from: ID, status: String, authType: AuthType): [User!]!
  }

  enum AccountState {
    VERIFIED
    DISABLED
    ARCHIVED
  }

  # we define an "input" type for our updateAccount mutation
  input UpdateAccountInput {
    id: ID!
    state: AccountState!
  }

  extend type Mutation {
    updateAccount(input: UpdateAccountInput!): Account!
  }
`;
