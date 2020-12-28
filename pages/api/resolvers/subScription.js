const { PubSub } = require("apollo-server");

const pubsub = new PubSub();
const POST_ADDED = "POST_ADDED";

export const subScriptionQuery = {
  posts(root, args, context) {
    return { author: "abul", comment: "com" };
  },
};

export const subScriptionMutation = {
  addPost(root, args, context) {
    pubsub.publish(POST_ADDED, { postAdded: args });
    return { author: "abul", comment: "com" };
  },
};

export const subScriptionShare = {
  Subscription: {
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
  },
};
