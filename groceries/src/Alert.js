import React, { useState, useEffect } from "react";

const Alert = ({ open, message, close }) => {
  useEffect(() => {
    if (message && message.length > 0) {
      setTimeout(() => {
        close();
      }, 3000);
    }
  }, [open]);

  return <>{open && <h3>{message}</h3>}</>;
};

export default Alert;
