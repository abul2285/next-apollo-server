import { scalarMutation, scalarQuery } from "./scalar";
import { rootMutation, rootQuery } from "./root";
import { customDate, Image } from "./customScalar";
import { enumQuery, enumMutation, enumShare } from "./enum";
import { unionsMutation, unionsQuery, unionsShare } from "./unions";
import {
  directivesMutation,
  directivesQuery,
  directivesShare,
} from "./directives";
import {
  interfacesMutation,
  interfacesQuery,
  interfacesShare,
} from "./interfaces";

export default {
  // Image: Image,
  // Date: customDate,
  // ...enumShare,
  // ...unionsShare,
  // ...interfacesShare,
  ...directivesShare,
  Query: {
    // ...rootQuery,
    // ...scalarQuery,
    // ...enumQuery,
    // ...unionsQuery,
    // ...interfacesQuery,
    ...directivesQuery,
  },
  Mutation: {
    // ...rootMutation,
    // ...scalarMutation,
    // ...enumMutation,
    // ...unionsMutation,
    // ...interfacesMutation,
    ...directivesMutation,
  },
};
