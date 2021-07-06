import React, { useState } from "react";
import data from "./data";
import List from "./List";
function App() {
  const [people, setPeople] = useState(data);
  const clearAll = () => {
    setPeople([]);
  };

  return (
    <main>
      <section className="container">
        <List data={people}></List>
        <button type="btn" onClick={clearAll}>
          clear all
        </button>
      </section>
    </main>
  );
}

export default App;
