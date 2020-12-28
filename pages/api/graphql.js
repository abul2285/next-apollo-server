import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import { getUserByToken, getById } from "./data/db";
import mongoose from "mongoose";
import AuhtDirective from "./directives/auth";
import Decoration from "./directives/decoration";
import PostData from "./datasources/Post";

const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  schemaDirectives: {
    auth: AuhtDirective,
    decorate: Decoration,
  },
  context: ({ req }) => {
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
});
const handler = apolloServer.createHandler({ path: "/api/graphql" });

(async function () {
  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
})();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
