import { gql } from "apollo-server";

export default gql`
  type Post {
    userId: Int
    id: Int!
    title: String!
    body: String!
  }

  extend type Query {
    posts: [Post!]!
  }

  input postInput {
    title: String!
    body: String!
    userId: Int!
  }
  extend type Mutation {
    addPost(input: postInput): Post!
    deletePost(id: Int!): String!
    updatePost(id: Int!, input: postInput): Post!
  }
`;
