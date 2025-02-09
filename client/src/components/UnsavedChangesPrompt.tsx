import React from "react";

interface UnsavedChangesPromptProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const UnsavedChangesPrompt: React.FC<UnsavedChangesPromptProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-900">Unsaved Changes</h2>
        <p className="text-gray-700 mt-2">You have unsaved changes. Are you sure you want to close?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Yes, Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsavedChangesPrompt;
