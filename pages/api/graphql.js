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
  subscriptions: {
    path: "/api/graphqlSubscriptions",
    keepAlive: 9000,
    onConnect: console.log("connected"),
    onDisconnect: () => console.log("disconnected"),
  },
  playground: {
    subscriptionEndpoint: "/api/graphqlSubscriptions",

    settings: {
      "request.credentials": "same-origin",
    },
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const graphqlWithSubscriptionHandler = async (req, res, next) => {
  // socket integration
  if (!res.socket.server.apolloServer) {
    await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("db connected");
        console.log(`* apolloServer first use *`);

        apolloServer.installSubscriptionHandlers(res.socket.server);
        const handler = apolloServer.createHandler({ path: "/api/graphql" });
        res.socket.server.apolloServer = handler;
      })
      .catch((err) => console.log(err));
  }

  return res.socket.server.apolloServer(req, res, next);
};

export default graphqlWithSubscriptionHandler;
