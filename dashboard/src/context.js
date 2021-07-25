import React, { useState, useContext, useEffect } from "react";
// make sure to use https
const AppContext = React.createContext();

const sites = [
  {
    title: "Quiz",
    url: "http://deluxjun-react-quiz.netlify.app",
    image: "Quiz.png",
  },
  {
    title: "Snake",
    url: "http://deluxjun-react-snake.netlify.app",
    image: "Snake.png",
  },
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
