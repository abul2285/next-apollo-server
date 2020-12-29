import { getUser } from "../data/db";

export const directivesQuery = {
  currentUser: (parent, args, context) => getUser(context.auth),
};
export const directivesMutation = {};
export const directivesShare = {
  User: {
    message: (user, args, context) => context.Message.getById(args.id),
  },
};
