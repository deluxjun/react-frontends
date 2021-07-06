import React, { useState } from "react";
import data from "./data";
import SingleQuestion from "./Question";
function App() {
  const [questions] = useState(data);
  console.log(questions);
  return (
    <main className="container">
      <h3>Questions And Answers About Login</h3>
      <section>
        {questions.map((q) => {
          return <SingleQuestion key={q.id} {...q}></SingleQuestion>;
        })}
      </section>
    </main>
  );
}

export default App;
