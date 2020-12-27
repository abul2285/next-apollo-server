import { scalarMutation, scalarQuery } from "./scalar";
import { rootMutation, rootQuery } from "./root";
import { customDate, Image } from "./customScalar";

export default {
  Image: Image,
  Date: customDate,
  Query: {
    ...rootQuery,
    ...scalarQuery,
  },
  Mutation: {
    ...rootMutation,
    ...scalarMutation,
  },
};
