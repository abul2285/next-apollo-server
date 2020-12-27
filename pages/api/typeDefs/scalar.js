import { gql } from "apollo-server";

export default gql`
  scalar Date
  scalar Image

  type Order {
    userId: Int!
    amount: Int!
    createdAt: Date!
  }

  extend type Query {
    orders: [Order]
    image: Image
    notImage: Image
  }
  extend type Mutation {
    addOrder(userId: Int!, amount: Int!): Order
  }
`;
