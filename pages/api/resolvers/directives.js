export const directivesQuery = {
  currentUser: (parent, args, context) => context.user,
};
export const directivesMutation = {};
export const directivesShare = {
  User: {
    message: (user, args, context) => context.Message.getById(args.id),
  },
};
