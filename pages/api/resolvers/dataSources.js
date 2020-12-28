export const dataSourceQuery = {
  posts: async (_, __, { dataSources }) => {
    return dataSources.postAPI.getPosts();
  },
};
export const dataSourceMutation = {
  addPost: async (_, { input }, { dataSources }) => {
    return dataSources.postAPI.addPost(input);
  },
  deletePost: async (_, { id }, { dataSources }) => {
    await dataSources.postAPI.deletePost(id);
    return "deleted successfully";
  },
  updatePost: async (_, { id, input }, { dataSources }) => {
    return dataSources.postAPI.updatePost(id, input);
  },
};
export const dataSourceShare = {};
