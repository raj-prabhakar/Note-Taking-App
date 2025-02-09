// server/routes/notes.js
const express = require("express");
const Note = require("../Models/Note");
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinaryConfig");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); // Store in memory for Cloudinary upload

// Function to upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "notes_images" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// Create or update note
router.post("/create-note", upload.single("image"), async (req, res) => {
  try {
    const { title, content, type, noteId } = req.body;
    let imageUrl = "";

    // Handle image upload if a file is provided
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file.buffer);
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    // Update existing note if noteId is provided
    if (noteId) {
      if (!imageUrl) {
        return res.status(400).json({ error: "No image provided for update" });
      }

      const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { $push: { imageUrls: imageUrl } },
        { new: true }
      );

      if (!updatedNote) {
        return res.status(404).json({ error: "Note not found" });
      }

      return res.status(200).json({ note: updatedNote, imageUrl: [imageUrl] });
    }

    // Create a new note (handle both empty and complete notes)
    const newNote = new Note({
      userId: req.userId,
      title: title || "",
      content: content || "",
      type: type || "text",
      imageUrls: imageUrl ? [imageUrl] : [],
    });

    const savedNote = await newNote.save();
    return res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating/updating note:", error);
    res.status(500).json({
      error: "Error processing request. Please try again later.",
      details: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
});

router.post("/", async (req, res) => {
  try {
    const { title, content, type } = req.body;
    // Create a new note. The "type" field is optional; if not provided, the schema's default ("text") is used.
    const newNote = new Note({
      userId: req.userId,
      title,
      content,
      type, // Allowed values are "audio" or "text"
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res
      .status(500)
      .json({ error: "Error creating note. Please try again later." });
  }
});

router.put("/:id", async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedNote);
});

router.get("/:id", async (req, res) => {
  const updatedNote = await Note.findById(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedNote);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Invalid Note" });
  }
  const note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

module.exports = router;
