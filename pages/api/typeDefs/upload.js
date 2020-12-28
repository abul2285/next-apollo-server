import { gql } from "apollo-server";

export default gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  extend type Query {
    uploads: [File]
  }

  extend type Mutation {
    singleUpload(file: Upload!): File!
    multipleUpload(file: [Upload!]!): [File!]!
  }
`;
