import React from "react";
import { Edit2 } from "lucide-react";
import AudioRecorder from "../components/AudioRecorder";
import axios from "axios";
import { toast } from "react-toastify";

interface CreateNoteBottomBarProps {
  onShowCreateModal: () => void;
  fetchNotes: () => void;
}

const CreateNoteBottomBar: React.FC<CreateNoteBottomBarProps> = ({
  onShowCreateModal,
  fetchNotes,
}) => {
  const BACKEND_URL = '/api';
  const handleSaveAudio = async (audioBlob: Blob, transcript: string) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);
      formData.append("transcript", transcript);

      const token = localStorage.getItem("token");

      await axios.post(`${BACKEND_URL}/audio`, formData, {
        headers: { Authorization: token as string },
      });
      fetchNotes();
      toast.success("Audio note created");
    } catch (error) {
      console.error("Error saving audio note:", error);
      toast.error("Audio note not created");
    }
  };
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-95 rounded-full shadow-2xl w-[82%] max-w-lg px-4 py-2 backdrop-blur-md border border-gray-200">
      <div className="flex items-center px-6 justify-between">
        {/* Create Note Button */}
        <button
          onClick={onShowCreateModal}
          className="flex items-center justify-center p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 shadow-sm"
        >
          <Edit2 className="w-6 h-6 text-gray-700" />
        </button>

        {/* Audio Recorder */}
        <div className="flex items-center mt-6 justify-center">
          <AudioRecorder onSave={handleSaveAudio} />
        </div>
      </div>
    </div>
  );
};

export default CreateNoteBottomBar;
