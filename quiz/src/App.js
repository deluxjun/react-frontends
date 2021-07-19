import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";

// "response_code":0,
// "results":[
// {
// "category":"Sports",
// "type":"multiple",
// "difficulty":"easy",
// "question":"Which of the following sports is not part of the triathlon?",
// "correct_answer":"Horse-Riding",
// "incorrect_answers":[
// "Cycling",
// "Swimming",
// "Running",
// ]
// }

function App() {
  const { ongoing, quiz, setQuiz, questions, goNext } = useGlobalContext();
  const answerRef = React.useRef();

  if (ongoing === 0) {
    return <SetupForm />;
  }
  if (ongoing === 2) {
    return <Modal />;
  }

  let currentQuiz = {};
  if (questions) currentQuiz = questions[quiz.current];

  const getAnswers = (q) => {
    let answers = [...q.incorrect_answers];
    if (!answers) return [];
    const rnd = Math.floor(Math.random() * 4);
    answers.splice(rnd, 0, q.correct_answer);
    console.log("rnd ", rnd, ", correct", q.correct_answer, answers);
    return answers;
  };

  const checkAnswer2 = (isAnswer) => {
    console.log("answer2: ", isAnswer);
    goNext(isAnswer);
  };

  console.log(currentQuiz);
  return (
    <>
      <main>
        <section className="quiz">
          <article className="container">
            <div>
              <h2
                dangerouslySetInnerHTML={{ __html: currentQuiz.question }}
              ></h2>
            </div>
            <div className="btn-container">
              {getAnswers(currentQuiz).map((answer, index) => {
                return (
                  <button
                    className="answer-btn"
                    key={index}
                    onClick={() =>
                      checkAnswer2(currentQuiz.correct_answer === answer)
                    }
                  >
                    {answer}
                  </button>
                );
              })}
            </div>
          </article>
          <div>
            <button
              type="button"
              className="next-question"
              onClick={() => checkAnswer2(false)}
            >
              next
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
