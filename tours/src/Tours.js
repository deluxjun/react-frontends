import React from "react";
import Tour from "./Tour";
const Tours = ({ tours, removeTour }) => {
  const NoTours = () => {
    return (
      <>
        <h3>No tours</h3>
        <button type="btn" onClick={() => window.location.reload()}>
          refresh
        </button>
      </>
    );
  };
  return (
    <>
      {tours.length < 1 && <NoTours></NoTours>}
      {tours.map((tour) => {
        return <Tour key={tour.id} {...tour} removeTour={removeTour}></Tour>;
      })}
    </>
  );
};

export default Tours;
