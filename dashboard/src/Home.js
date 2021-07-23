import React from "react";
// import Form from './SearchForm'
import Site from "./Site";

import { useGlobalContext } from "./context";

const Home = () => {
  const { sites } = useGlobalContext();
  return (
    <main className="section">
      <h2>Projects</h2>
      <div className="sites">
        {sites.map((site, index) => {
          return <Site key={index} {...site}></Site>;
        })}
      </div>
    </main>
  );
};

export default Home;
