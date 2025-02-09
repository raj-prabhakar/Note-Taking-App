import React, { useState } from "react";

interface CreateNoteModalProps {
  onClose: () => void;
  onCreate: (title: string, content: string, type: "text") => void;
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a title for the note.");
      return;
    }
    onCreate(title, content, "text");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-md z-50">
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl p-6 md:p-8 relative animate-fadeIn">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">Create a New Note</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              required
            />
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 text-lg border border-gray-300 rounded-lg h-40 resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Create Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;
