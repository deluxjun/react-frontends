import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { table, difficulties, quiz, setQuiz, makeQuestions } =
    useGlobalContext();

  const create = (e) => {
    e.preventDefault();
    makeQuestions();
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log("handleChange", e.target.name);
    const name = e.target.name;
    const value = e.target.value;
    const newQuiz = { ...quiz, [name]: value };
    console.log("newQuiz", newQuiz);
    setQuiz(newQuiz);
  };

  return (
    <main>
      <section className="quiz quiz-small">
        <form onSubmit={create} className="setup-form">
          <div className="form-control">
            <label htmlFor="amount">Amount:</label>
            <input
              className="form-input"
              type="text"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">Choose a category:</label>
            <select
              className="form-input"
              name="category"
              id="category"
              onChange={handleChange}
            >
              {Object.entries(table).map(([key, value]) => {
                return (
                  <option key={value} value={value}>
                    {key}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulties">Choose a difficulty:</label>
            <select
              className="form-input"
              name="difficulty"
              id="difficulties"
              onChange={handleChange}
            >
              {difficulties.map((difficulty, index) => {
                return (
                  <option key={index} value={difficulty}>
                    {difficulty}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Create
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
