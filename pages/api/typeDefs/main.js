import { gql } from "apollo-server-micro";

export default gql`
  # object type
  type Book {
    # scalar type
    title: String
    author: Author
  }

  type Author {
    name: String
    # object type ref
    books: [Book]
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
    likes: Int!
    mediaUrls: [String!]!
  }

  # input type
  input PostAndMediaInput {
    "A main title for the post"
    title: String
    "The text body of the post."
    body: String
    "A list of URLs to render in the post."
    mediaUrls: [String]
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    likePosts: [String!]!
  }

  # Structuring mutation responses
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  #  implementing object type
  type UpdateUserEmailMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type LikePostMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    post: Post
    user: User
  }

  extend type Query {
    books: [Book]
    authors: [Author]
    files: [File!]
    # today: Today
  }

  extend type Mutation {
    addBook(title: String): Book!
    addAuthor(name: String): Author!
    # input type ref
    createPost(post: PostAndMediaInput): Post
    addUser(name: String!, email: String): User!
    likePost(userId: String!, postId: String): LikePostMutationResponse!
    uploadFile(file: Upload!): File
    # structure of updateUserEmail response
    updateUserEmail(email: String!): UpdateUserEmailMutationResponse
    # today(date: Date): Today
  }
`;
