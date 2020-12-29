import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-micro";

import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import mockObj from "./utils/mockObj";
import PostData from "./datasources/Post";
import AuhtDirective from "./directives/auth";
import Decoration from "./directives/decoration";
import { getById } from "./data/db";

const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  schemaDirectives: {
    auth: AuhtDirective,
    decorate: Decoration,
  },
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    }
    const auth = req.headers.authorization || "";
    return {
      auth,
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

(async function () {
  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log(err);
  }
})();

const handler = apolloServer.createHandler({ path: "/api/graphql" });
export default handler;
