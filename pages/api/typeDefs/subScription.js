import { gql } from "apollo-server-micro";

export default gql`
  type Subscription {
    postAdded: Post
  }

  extend type Query {
    posts: [Post]
  }

  extend type Mutation {
    addPost(author: String, comment: String): Post
  }

  type Post {
    author: String
    comment: String
  }
`;
