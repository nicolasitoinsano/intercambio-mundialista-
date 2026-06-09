import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function ModalContainer() {
  const { modal, closeModal } = useAppContext();

  if (!modal.isOpen) return null;

  return (
    <div id="modalContainer">
      <div className="modal-overlay" onClick={(e) => { if(e.target === e.currentTarget) closeModal() }}>
        <div className="modal-content">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold">{modal.title}</h3>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="p-5" dangerouslySetInnerHTML={{ __html: modal.content }}></div>
        </div>
      </div>
    </div>
  );
}
