
import type React from "react"
import { useState, useEffect } from "react"
import { Maximize2, Minimize2, Star, X, ImageIcon, Copy, Edit2, Save, Trash } from "lucide-react"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"
import AudioPlayer from "../components2/AudioPlayer"
import ImageGallery from "../components2/ImageGallary"
import EditableContent from "../components2/EditableContent"
import axios from "axios"
import UnsavedChangesPrompt from "../components/UnsavedChangesPrompt"

interface NoteModalProps {
  note: {
    _id: string
    title: string
    content: string
    isFavorite: boolean
    createdAt: string
    imageUrls?: string[]
    audioUrl?: string
    type: string
  }
  onClose: () => void
  onUpdate: (noteId: string, updates: any) => Promise<void>
  onDelete: (noteId: string) => Promise<void>
}

const NoteModal: React.FC<NoteModalProps> = ({ note, onClose, onUpdate, onDelete }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(note.title)
  const [editedContent, setEditedContent] = useState(note.content)
  const [isFavorite, setIsFavorite] = useState(note.isFavorite)
  const [localImageUrls, setLocalImageUrls] = useState<string[]>(note.imageUrls || [])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isUnsaved, setIsUnsaved] = useState<boolean>(false);

  useEffect(() => {
    setEditedTitle(note.title)
    setEditedContent(note.content)
    setIsFavorite(note.isFavorite)
    setLocalImageUrls(note.imageUrls || [])
  }, [note])

  const handleSave = async () => {
    setLoading(true)
    try {
      const updates = {
        title: editedTitle,
        content: editedContent,
        isFavorite,
        imageUrls: localImageUrls,
      }

      await onUpdate(note._id, updates)
      setIsEditing(false)
      toast.success("Note saved successfully")
    } catch (error) {
      toast.error("Error saving note")
    } finally {
      setLoading(false)
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(note.content)
    toast.success("Copied to Clipboard")
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    setLoading(true);
    const token = localStorage.getItem("token");
  
    const formData = new FormData();
    formData.append("image", file);
    formData.append("noteId", note._id);
    formData.append("title", note.title);
    formData.append("content", note.content);
    formData.append("type", note.type);

    const BACKEND_URL = '/api';
  
    try {
      const { data } = await axios.post(`${BACKEND_URL}/notes/create-note`, formData, {
        headers: {
          Authorization: token ? token : "",
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(data);

      const images = data?.note?.imageUrls || data?.note?.imageUrl;
  
      if (images && images?.length > 0) {
        const updatedImageUrls = images;
        console.log(data);
        setLocalImageUrls(updatedImageUrls);
        await onUpdate(note._id, { imageUrls: updatedImageUrls });
        // await handleSave();
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };
  

  const handleToggleFavorite = async () => {
    try {
      const newFavoriteStatus = !isFavorite
      setIsFavorite(newFavoriteStatus)
      await onUpdate(note._id, { isFavorite: newFavoriteStatus })
    } catch (error) {
      setIsFavorite(isFavorite) // Revert on error
      toast.error("Failed to update favorite status")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      {loading && <Loader />}
      <div
        className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isFullscreen ? "w-screen h-screen" : "w-full max-w-4xl mx-4"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-gray-200">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full text-2xl font-semibold px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white transition-colors"
              />
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{note.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Created on {formatDate(note.createdAt)}</p>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3 ml-4">
            <button
              onClick={handleToggleFavorite}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
              title="Toggle Favorite"
            >
              <Star className={`w-6 h-6 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="w-6 h-6 text-gray-600" />
              ) : (
                <Maximize2 className="w-6 h-6 text-gray-600" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
              title="Close Modal"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-6 p-6 max-h-[70vh] overflow-y-auto">
          {/* Audio Player */}
          {note.type === "audio" && note.audioUrl && <AudioPlayer audioUrl={note.audioUrl} />}

          {/* Text Content */}
          <div className="prose max-w-none">
            <EditableContent
              isEditing={isEditing}
              content={editedContent}
              onChange={setEditedContent}
              noteType={note.type}
            />
          </div>

          {/* Image Content */}
          <ImageGallery imageUrls={localImageUrls} />
        </div>

        <UnsavedChangesPrompt
            isOpen={isUnsaved}
            onConfirm={()=>{setEditedContent(note.content); setIsEditing(false); setIsUnsaved(false)}}
            onCancel={()=>{setIsUnsaved(false)}}
        />

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  <span className="text-sm">Save Changes</span>
                </button>
                <button
                  onClick={() => {
                    if(editedTitle !== note.title || editedContent !== note.content){
                      setIsUnsaved(true);
                    } else {
                      setIsEditing(false)
                      setEditedTitle(note.title)
                      setEditedContent(note.content)
                    }
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                  <span className="text-sm">Cancel</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-1 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Edit Note"
                >
                  <Edit2 className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">Edit</span>
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center space-x-1 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copy Content"
                >
                  <Copy className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">Copy</span>
                </button>
                <label
                  className="flex items-center space-x-1 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
                  title="Upload Image"
                >
                  <ImageIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">Add Image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </>
            )}
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center space-x-2 p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
            title="Delete Note"
          >
            <Trash className="w-5 h-5" />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={onDelete}
        loading={loading}
        id={note._id}
      />
    </div>
  )
}

export default NoteModal