const express = require("express");
const uploadAudio = require("../utils/uploadAudio");
const Note = require("../Models/Note");
const multer = require("multer");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST endpoint to create a new audio note
router.post('/', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // Upload to Cloudinary
    const result = await uploadAudio(req.file.buffer);

    // Create new note
    const note = new Note({
      userId: req.userId, // Assuming you have authentication middleware
      title: req.body.title || 'Audio Note',
      content: req.body.transcript || '',
      type: 'audio',
      audioUrl: result.secure_url
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating audio note:', error);
    res.status(500).json({ error: 'Failed to create audio note' });
  }
});

module.exports = router;