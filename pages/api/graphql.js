import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import mongoose from "mongoose";

const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: () => {},
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
