import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};
const difficulties = ["easy", "medium", "hard"];

const initialData = [
  {
    category: "Sports",
    type: "multiple",
    difficulty: "easy",
    question: "Which of the following sports is not part of the triathlon?",
    correct_answer: "Horse-Riding",
    incorrect_answers: ["Cycling", "Swimming", "Running"],
  },
];

const initialQuiz = {
  amount: 10,
  difficulty: "easy",
  category: 21,
  current: 0,
  correct: 0,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [questions, setQuestions] = useState(initialData);
  const [quiz, setQuiz] = useState(initialQuiz);
  const [ongoing, setOngoing] = useState(0);
  const { amount, category, difficulty } = quiz;

  const makeQuestions = async () => {
    const url = `${API_ENDPOINT}amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    console.log(url);
    try {
      const resp = await fetch(url);
      const json = await resp.json();
      console.log(json);
      if (json.response_code === 0) {
        setQuestions(json.results);
        setOngoing(1);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const goNext = (isAnswer) => {
    if (quiz.current + 1 >= quiz.amount) {
      setOngoing(2);
    }

    setQuiz((old) => {
      return {
        ...quiz,
        current: old.current + 1,
        correct: old.correct + isAnswer ? 1 : 0,
      };
    });
  };

  useEffect(() => {
    // fetchQuestions()
  }, []);
  return (
    <AppContext.Provider
      value={{
        table,
        difficulties,
        quiz,
        setQuiz,
        makeQuestions,
        questions,
        goNext,
        ongoing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
