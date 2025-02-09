const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String },
  content: { type: String },
  isFavorite: { type: Boolean, default: false },
  type: { type: String, enum: ["audio", "text"], default: "text" },
  imageUrls: { type: [String], default: [] },
  audioUrl: { type: String, default: "" }, // Store the Cloudinary URL of the audio file
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", noteSchema);
