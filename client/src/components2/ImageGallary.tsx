import type React from "react"
import NoteImage from "../components/NoteImage"

interface ImageGalleryProps {
  imageUrls: string[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls }) => {
  if (imageUrls?.length === 0) return null

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Attached Images</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imageUrls?.map((url, idx) => (
          <NoteImage key={`${url}-${idx}`} imageUrl={url} />
        ))}
      </div>
    </div>
  )
}

export default ImageGallery

