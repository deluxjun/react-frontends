import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { isOpenModal, closeModal } = useGlobalContext();
  if (!isOpenModal) return <></>;

  console.log("Modal heres");
  return (
    <div className="modal-overlay show-modal">
      <div className="modal-container">
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes />
        </button>
        <h2>Title</h2>
      </div>
    </div>
  );
};

export default Modal;
