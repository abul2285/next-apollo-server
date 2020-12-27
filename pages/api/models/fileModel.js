import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const fileSchema = new Schema({
  filename: String,
  mimetype: String,
  path: String,
});
export default mongoose.models.File || model("File", fileSchema);
