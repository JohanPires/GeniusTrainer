import React, { useEffect } from "react";

function ModalRegister({ isVisible, onClose, message }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Succès</h2>
        <p className="mb-4">{message}</p>
      </div>
    </div>
  );
}

export default ModalRegister;
