import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
const basic_tours = [
  {
    id: "rec6d6T3q5EBIdCfD",
    name: "Best of Paris in 7 Days Tour",
    info: "Paris is synonymous with the finest things that culture can offer — in art, fashion, food, literature, and ideas. On this tour, your Paris-savvy Rick Steves guide will immerse you in the very best of the City of Light: the masterpiece-packed Louvre and Orsay museums, resilient Notre-Dame Cathedral, exquisite Sainte-Chapelle, and extravagant Palace of Versailles. You'll also enjoy guided neighborhood walks through the city's historic heart as well as quieter moments to slow down and savor the city's intimate cafés, colorful markets, and joie de vivre. Join us for the Best of Paris in 7 Days!",
    image:
      "https://dl.airtable.com/.attachments/a0cd0702c443f31526267f38ea5314a1/2447eb7a/paris.jpg",
    price: "1,995",
  },
];

function App() {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState(basic_tours);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setTours(data);
        setLoading(false);
      });
  }, []);

  const removeTour = (nid) => {
    console.log(nid);
    setTours((oldTours) => {
      const ntours = oldTours.filter(({ id }) => id !== nid);
      return ntours;
    });
  };

  return (
    <main>
      <section className="container">
        {loading && <Loading className="Loading"></Loading>}
        <Tours tours={tours} removeTour={removeTour}>
          Tours Project Setup
        </Tours>
      </section>
    </main>
  );
}

export default App;
