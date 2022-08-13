import React from "react";
import ReactModal from "react-modal";
import "../styles/modal.css";
import "../styles/forms.css";

export default function Modal({ showModal, children }) {
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => showModal(false)}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      className="Modal"
      overlayClassName="Overlay"
    >
      <button onClick={() => showModal(false)} className="close">
        X
      </button>
      {children}
    </ReactModal>
  );
}
