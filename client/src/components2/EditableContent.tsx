import type React from "react"

interface EditableContentProps {
  isEditing: boolean
  content: string
  onChange: (content: string) => void
  noteType: string
}

const EditableContent: React.FC<EditableContentProps> = ({ isEditing, content, onChange, noteType }) => {
  if (isEditing) {
    return (
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        placeholder="Enter your note content..."
      />
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      {noteType === "audio" && <h3 className="text-lg font-semibold text-purple-700 mb-6">🎤 Transcript</h3>}
      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
  )
}

export default EditableContent

