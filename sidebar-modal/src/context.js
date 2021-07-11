import React, { useState, useContext, createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenSidebar, setOpenSidebar] = useState(false);
  const showModal = () => {
    console.log("[showModal]");
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const showSidebar = () => {
    console.log("[showSidebar]");
    setOpenSidebar(true);
  };
  const closeSidebar = () => {
    setOpenSidebar(false);
  };

  return (
    <AppContext.Provider
      value={{
        isOpenModal,
        isOpenSidebar,
        showModal,
        closeModal,
        showSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
