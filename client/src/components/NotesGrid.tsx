import React from "react";
import { Mic, Star, Image as ImageIcon } from "lucide-react";
import { Note } from "../pages/Dashboard"; // Adjust the import if necessary

interface NotesGridProps {
  notes: Note[];
  formatDate: (dateString: string) => string;
  toggleFavorite: (note: Note) => void;
  setSelectedNote: (note: Note) => void;
}

const NotesGrid: React.FC<NotesGridProps> = ({ notes, formatDate, toggleFavorite, setSelectedNote }) => (
  <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-auto">
    {notes.map((note) => (
      <div
        key={note._id}
        onClick={() => setSelectedNote(note)}
        className="p-6 border rounded-lg cursor-pointer hover:shadow-xl transition-shadow relative bg-white"
      >
        <div className="flex justify-between items-start">
          <p className="text-sm text-gray-500">{formatDate(note.createdAt)}</p>
          <div className="flex items-center space-x-3">
            {note.type === "audio" ? (
              <Mic className="w-5 h-5 text-gray-400" />
            ) : (
              <img
                src="https://img.icons8.com/ios-glyphs/30/808080/document.png"
                alt="Text Note Icon"
                className="w-5 h-5"
              />
            )}
            {/* Display Image Count if Images Exist */}
            {note.imageUrls && note.imageUrls.length > 0 && (
              <div className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                <ImageIcon className="w-4 h-4" />
                <span>{note.imageUrls.length}</span>
              </div>
            )}
            <button
              className="p-1 hover:bg-gray-100 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(note);
              }}
            >
              <Star className={`w-5 h-5 ${note.isFavorite ? "text-yellow-400" : "text-gray-400"}`} />
            </button>
          </div>
        </div>
        <h3 className="font-bold text-lg mt-4">{note.title}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">{note.content}</p>
      </div>
    ))}
  </div>
);

export default NotesGrid;
