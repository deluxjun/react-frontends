import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { quiz } = useGlobalContext();
  return (
    <h2>
      CORRECT: {quiz.correct}/{quiz.amount}
    </h2>
  );
};

export default Modal;
