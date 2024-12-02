import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);
