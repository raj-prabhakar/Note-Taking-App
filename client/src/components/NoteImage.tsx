import React, { useState, useRef, useEffect } from 'react';
import { Loader2, ZoomIn, ZoomOut, X, RotateCw } from 'lucide-react';
import { toast } from 'react-toastify';

interface NoteImageProps {
  imageUrl: string;
}

const NoteImage: React.FC<NoteImageProps> = ({ imageUrl }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (): void => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = (): void => {
    setIsLoading(false);
    setHasError(true);
    toast.error("Failed to load image");
  };

  const toggleZoom = (): void => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
    setIsZoomed(!isZoomed);
  };

  const increaseZoom = (): void => {
    setScale((prev) => Math.min(5, prev + 0.2));
  };

  const decreaseZoom = (): void => {
    setScale((prev) => Math.max(1, prev - 0.2));
  };

  const rotateImage = (): void => {
    setRotation((prev) => prev + 90);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    event.preventDefault();
    const delta = -Math.sign(event.deltaY) * 0.2;
    setScale((prev) => Math.max(1, Math.min(5, prev + delta)));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !isZoomed || !imageRef.current || !modalRef.current) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isZoomed) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isZoomed]);

  if (!imageUrl || hasError) return null;

  return (
    <>
      <div className="relative mt-4">
        {isLoading && (
          <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-lg">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
        )}
        <img
          src={imageUrl}
          alt="Note attachment"
          className={`transition-opacity duration-300 ease-in-out cursor-pointer w-32 h-32 object-cover rounded-lg shadow-md ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={toggleZoom}
        />
      </div>

      {isZoomed && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="relative max-h-full max-w-full">
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Note attachment"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
                transformOrigin: 'center',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                maxHeight: '90vh',
                maxWidth: '90vw',
                objectFit: 'contain',
              }}
              className="mx-auto my-auto rounded-lg"
              draggable={false}
            />
            <button
              onClick={toggleZoom}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg transition-colors duration-200 hover:bg-gray-100"
              title="Close"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <button
                onClick={decreaseZoom}
                className="p-2 bg-white rounded-full shadow-lg transition-colors hover:bg-gray-100"
                title="Zoom Out"
              >
                <ZoomOut className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={increaseZoom}
                className="p-2 bg-white rounded-full shadow-lg transition-colors hover:bg-gray-100"
                title="Zoom In"
              >
                <ZoomIn className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={rotateImage}
                className="p-2 bg-white rounded-full shadow-lg transition-colors hover:bg-gray-100"
                title="Rotate"
              >
                <RotateCw className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteImage;
