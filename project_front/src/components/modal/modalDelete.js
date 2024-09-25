import React from "react";

function ModalDelete({ isVisible, onClose, onConfirm }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Confirmation</h2>
        <p className="mb-4">
          Êtes-vous sûr de vouloir supprimer votre compte ?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
