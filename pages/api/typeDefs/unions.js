import { gql } from "apollo-server";

export default gql`
  # extend type Book{};
  # extend type Author{};
  union Result = Book | Author

  # extend type User{};
  type UserNotFoundError {
    message: String!
  }
  union UserResult = User | UserNotFoundError

  type UserRegisterResultSuccess {
    user: User!
  }
  type UserRegisterInvalidInput {
    message: String!
    loginErrorMessage: String
    emailErrorMessage: String
    passwordErrorMessage: String
  }
  type CountryBlocked {
    message: String!
  }
  union UserRegisterResult =
      UserRegisterResultSuccess
    | UserRegisterInvalidInput
    | CountryBlocked

  input UserRegisterInput {
    name: String!
    email: String!
  }

  extend type Query {
    search(id: ID!): Result!
    searchUser(id: ID!): UserResult!
  }

  extend type Mutation {
    userRegister(input: UserRegisterInput!): UserRegisterResult!
  }
`;
