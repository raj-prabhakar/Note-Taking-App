import React from "react";
import { toast } from "react-toastify";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  loading: boolean;
  id: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  id,
}) => {
  if (!isOpen) return null; // Prevents rendering when modal is closed

  const handleDelete = async () => {
    try {
      await onConfirm(id);
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Delete Note
        </h3>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
