import React, { useState, useContext, createContext } from "react";
import sublinks from "./data";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isOpenSidebar, setOpenSidebar] = useState(false);
  const [location, setLocation] = useState({});
  const [page, setPage] = useState("");

  const showOpenMenu = ({ center, bottom }) => {
    console.log("showOpenMenu", center, bottom);
    setLocation({ center, bottom });
    setOpenMenu(true);
  };

  const openSidebar = () => {
    console.log("openSidebar");
    setOpenSidebar(true);
  };

  const closeSidebar = () => {
    console.log("closeSidebar");
    setOpenSidebar(false);
  };

  const closeOpenMenu = () => {
    setOpenMenu(false);
  };

  return (
    <AppContext.Provider
      value={{
        isOpenMenu,
        showOpenMenu,
        closeOpenMenu,
        location,
        isOpenSidebar,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export default useGlobalContext;

export { AppContext, AppProvider };
