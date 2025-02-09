import React, { useState } from "react";
import axios from "axios";
import { Note } from "../pages/Dashboard";

interface NoteModalProps {
  note: Note;
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ note, onClose }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(note.isFavorite);
  const [image, setImage] = useState<File | null>(null);
  const token = localStorage.getItem("token");

  console.log(image);

  const updateNote = async () => {
    try {
      await axios.put(
        `/api/notes/${note._id}`,
        { title, content, isFavorite },
        { headers: { Authorization: token as string } }
      );
      onClose();
    } catch (error) {
      alert("Error updating note");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      // In a real app, you would handle uploading the image file to a storage service.
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        isFullscreen ? "p-0" : "p-4"
      }`}
    >
      <div
        className={`bg-white rounded shadow-lg w-full max-w-2xl ${
          isFullscreen ? "h-full" : ""
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Edit Note</h2>
          <button onClick={onClose} className="text-red-500">
            Close
          </button>
        </div>
        <div className="p-4 overflow-auto h-96">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full mb-2 h-32"
          />
          <div className="flex items-center space-x-2 mb-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 ${isFavorite ? "bg-yellow-300" : "bg-gray-200"}`}
            >
              {isFavorite ? "Unfavorite" : "Favorite"}
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-gray-200"
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>
          <input type="file" onChange={handleImageUpload} className="mb-2" />
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={updateNote}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
