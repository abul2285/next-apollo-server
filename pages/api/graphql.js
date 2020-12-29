import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import { getUserByToken, getById } from "./data/db";
import mongoose from "mongoose";
import AuhtDirective from "./directives/auth";
import Decoration from "./directives/decoration";
import PostData from "./datasources/Post";
import mockObj from "./utils/mockObj";

const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  schemaDirectives: {
    auth: AuhtDirective,
    decorate: Decoration,
  },
  context: ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    }
    const token = req.headers.authorization;
    const currentUser = getUserByToken(token);
    return {
      user: currentUser,
      User: { getUserByToken },
      Message: { getById },
    };
  },
  dataSources: () => {
    return {
      postAPI: new PostData(),
    };
  },
  mocks: mockObj,
  mockEntireSchema: false,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = apolloServer.createHandler({ path: "/api/graphql" });
export default handler;
