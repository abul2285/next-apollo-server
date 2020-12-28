import { RESTDataSource } from "apollo-datasource-rest";

class PostData extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://jsonplaceholder.typicode.com/";
  }

  async getPost(id) {
    return this.get(`posts/${id}`);
  }

  async getPosts() {
    return this.get("posts");
  }

  async addPost(data) {
    return this.post("posts", { ...data });
  }
  async deletePost(id) {
    return this.delete(`posts/${id}`);
  }
  async updatePost(id, data) {
    return this.put(`posts/${id}`, { ...data });
  }
}

export default PostData;
