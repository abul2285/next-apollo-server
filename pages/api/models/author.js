const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

export default mongoose.models.Author || mongoose.model("Author", AuthorSchema);
