const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  mediaUrls: { type: Array, default: [] },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
