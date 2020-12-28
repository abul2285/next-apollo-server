import fileUploader from "../../../util/fileUploader";

export const uploadQuery = {
  uploads: (parent, args) => {},
};

export const uploadMutation = {
  singleUpload: async (_, { file }) => {
    return fileUploader(file);
  },
  multipleUpload: async (_, { file }) => {
    const files = await Promise.all(file);
    return files.map((file) => fileUploader(file));
  },
};

export const uploadShare = {};
