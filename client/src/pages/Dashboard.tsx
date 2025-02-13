import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoteModal from "./NoteModal";
import CreateNoteModal from "../components/CreateNoteModal";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import NotesGrid from "../components/NotesGrid";
import CreateNoteBottomBar from "../components/CreateNoteBottomBar";
import Loader from "../components/Loader";

export interface Note {
  _id: string;
  title: string;
  content: string;
  isFavorite: boolean;
  createdAt: string;
  type: "text" | "audio";
  imageUrls?: string[];
}

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortOldToNew, setSortOldToNew] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const BACKEND_URL = '/api';

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/notes`, {
        headers: { Authorization: token as string },
      });
      console.log(response?.data)
      setNotes(response?.data);
    } catch (error) {
      toast.error("Error fetching notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const sortedNotes = [...notes].sort((a, b) =>
    sortOldToNew
      ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = sortedNotes.filter((note) => {
    const matchesSearch =
      note?.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      note?.content?.toLowerCase().includes(searchTerm?.toLowerCase());
    return showFavorites ? note.isFavorite && matchesSearch : matchesSearch;
  });

  const handleUpdateNote = async (noteId: string, updates: Partial<Note>) => {
    setLoading(true);
    try {
      await axios.put(`${BACKEND_URL}/notes/${noteId}`, updates, {
        headers: { Authorization: token as string },
      });
      fetchNotes();
    } catch (error) {
      toast.error("Error updating note");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    setLoading(true);
    try {
      await axios.delete(`${BACKEND_URL}/notes/${noteId}`, {
        headers: { Authorization: token as string },
      });
      fetchNotes();
      setSelectedNote(null);
    } catch (error) {
      toast.error("Error deleting note");
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (
    title: string,
    content: string,
    type: "text" | "audio" = "text"
  ) => {
    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/notes/create-note`,
        { title, content, type },
        { headers: { Authorization: token as string } }
      );
      fetchNotes();
      toast.success("Note added successfully!");
      setShowCreateModal(false);
    } catch (error) {
      toast.error("Error adding note. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (note: Note) => {
    await handleUpdateNote(note._id, { isFavorite: !note.isFavorite });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-white">
      {loading && <Loader />} 
      <Sidebar showFavorites={showFavorites} setShowFavorites={setShowFavorites} />
      <div className="flex-1 flex flex-col">
        <TopBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onSortToggle={() => setSortOldToNew(!sortOldToNew)}
        />
        <NotesGrid
          notes={filteredNotes}
          formatDate={formatDate}
          toggleFavorite={toggleFavorite}
          setSelectedNote={setSelectedNote}
        />
        <CreateNoteBottomBar
          onShowCreateModal={() => setShowCreateModal(true)}
          // handleAudioTranscribe={handleAudioTranscribe}
          fetchNotes={fetchNotes}
        />
      </div>
      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={handleUpdateNote}
          onDelete={handleDeleteNote}
        />
      )}
      {showCreateModal && (
        <CreateNoteModal
          onClose={() => setShowCreateModal(false)}
          onCreate={addNote}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
