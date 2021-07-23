import React, { useState, useContext, useEffect } from "react";
// make sure to use https
const AppContext = React.createContext();

const sites = [
  { title: "Quiz", url: "http://www.google.com", image: "Quiz.png" },
  { title: "Quiz2", url: "", image: "Quiz.png" },
];

const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ sites }}>{children}</AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
