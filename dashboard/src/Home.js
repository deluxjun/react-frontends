import React from "react";
// import Form from './SearchForm'
import Site from "./Site";

import { useGlobalContext } from "./context";

const Home = () => {
  const { sites } = useGlobalContext();
  return (
    <main>
      <section className="s1">
        <div className="main-container">
          <div className="greeting-wrapper">
            <h1>Hi, I'm Junsoo Bae</h1>
          </div>
        </div>
      </section>
      <section className="s2">
        <div className="main-container">About</div>
      </section>
      <section className="s1">
        <div className="main-container">
          Portfolio
          <div className="sites">
            {sites.map((site, index) => {
              return <Site key={index} {...site}></Site>;
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
