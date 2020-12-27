import { scalarMutation, scalarQuery } from "./scalar";
import { rootMutation, rootQuery } from "./root";
import { customDate, Image } from "./customScalar";
import { enumQuery, enumMutation, enumShare } from "./enum";

export default {
  Image: Image,
  Date: customDate,
  ...enumShare,
  Query: {
    // ...rootQuery,
    ...scalarQuery,
    ...enumQuery,
  },
  Mutation: {
    // ...rootMutation,
    ...scalarMutation,
    ...enumMutation,
  },
};
