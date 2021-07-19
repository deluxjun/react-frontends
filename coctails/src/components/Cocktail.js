import React from "react";
import { Link } from "react-router-dom";

// const initialState = [
//   {
//     idDrink: "15997",
//     strDrink: "GG",
//     strDrinkAlternate: null,
//     strTags: null,
//     strVideo: null,
//     strCategory: "Ordinary Drink",
//     strIBA: null,
//     strAlcoholic: "Optional alcohol",
//     strGlass: "Collins Glass",
//     strInstructions:
//       "Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.",
//     strInstructionsES: null,
//     strInstructionsDE:
//       "Den Galliano-Likör über Eis gießen. Füllen Sie den Rest des Glases mit Ginger Ale und das ist alles, was dazu gehört. Du hast jetzt ein eigenes GG.",
//     strInstructionsFR: null,
//     strInstructionsIT:
//       "Versare il liquore Galliano su ghiaccio. \
//    Riempi il resto del bicchiere con ginger ale e questo è tutto. \
//    Ora hai il tuo GG personale.",
//     "strInstructionsZH-HANS": null,
//     "strInstructionsZH-HANT": null,
//     strDrinkThumb:
//       "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",
//     strIngredient1: "Galliano",
//     strIngredient2: "Ginger ale",
//     strIngredient3: "Ice",
//     strMeasure1: "2 1/2 shots ",
//     strImageSource: null,
//     strImageAttribution: null,
//     strCreativeCommonsConfirmed: "No",
//     dateModified: "2016-07-18 22:06:00",
//   },
// ];

const Cocktail = ({
  idDrink,
  strDrink,
  strDrinkThumb,
  strAlcoholic,
  strCategory,
  strInstructions,
}) => {
  return (
    <div className="cocktail">
      {/* <h2>{idDrink}</h2> */}
      <div>
        <img className="image-container" src={strDrinkThumb}></img>
        <div className="cocktail-footer">
          <Link to={`/cocktail/${idDrink}`}>
            <h2>{strDrink}</h2>
          </Link>
          {/* <h3>{strAlcoholic}</h3> */}
          <h4>{strCategory}</h4>
          <p>{strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default Cocktail;
