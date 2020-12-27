import { createWriteStream, mkdir } from "fs";
import Author from "./models/author";
import Book from "./models/book";
import File from "./models/fileModel";
import Post from "./models/post";
import User from "./models/user";
import mongoose from "mongoose";

const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = Date.now();
  const path = `public/images/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path, filename, mimetype }))
      .on("error", reject)
  );
};

const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const file = await storeUpload({ stream, filename, mimetype });
  return file;
};

export default {
  Query: {
    books: async () => {
      let books = await Book.find({}).populate("author");
      return books;
    },
    authors: async () => {
      const authors = await Author.find().populate("books");
      console.log({ authors });
      return authors;
    },
    files: async () => {
      let files = File.find();
      return files;
    },
  },

  Mutation: {
    addBook: async (_, { title }) => {
      //abul's id: 5fe7fa8016c3ed29c8d00043
      //billal's id: 5fe7fac316c3ed29c8d00047
      //anwar's id: 5fe802dc16c3ed29c8d0004e
      const author = await Author.findById("5fe802dc16c3ed29c8d0004e");
      const book = await new Book({ title, author });
      let tempBook = await book.save();
      author.books.push(tempBook._id);
      author.save();
      let books = Book.find({ _id: { $in: author.books } });
      return { ...tempBook._doc, author: { ...author._doc, books } };
    },

    addAuthor: async (_, { name }) => {
      const author = await new Author({ name, books: [] });
      return author.save();
    },
    uploadFile: async (_, { file }) => {
      mkdir("public/images", { recursive: true }, (err) => {
        if (err) throw err;
      });
      const upload = await processUpload(file);
      // save our file to the mongodb
      await File.create({ ...upload, path: upload.path.replace("public", "") });
      return upload;
    },

    createPost: async (_, { post }) => {
      // delete mongoose.connection.models["Post"];
      let newPost = await new Post(post);
      console.log({ likes: 0 });
      console.log(newPost);
      newPost.save();
      return newPost;
    },
    addUser: async (_, args) => {
      let newUser = await new User(args);
      newUser.save();
      return newUser;
    },
    likePost: async (_, { postId, userId }) => {
      console.log({ postId, userId });
      let user = await User.findById(userId);
      console.log({ user });
      user.likePosts.push(postId);
      user.save();
      let post = await Post.findById(postId);
      console.log({ post });
      post.likes++;
      post.save();
      return {
        code: 200,
        success: true,
        message: "you have successed to like a post",
        post: { ...post._doc },
        user: { ...user._doc },
      };
    },
  },
};
