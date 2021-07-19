import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { cocktails } = useGlobalContext();
  return (
    <section className="section">
      <div className="section-title"></div>
      <div className="cocktails-center">
        {cocktails.map((cocktail) => {
          return <Cocktail {...cocktail}></Cocktail>;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
