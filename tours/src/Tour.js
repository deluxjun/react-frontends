import React, { useState } from "react";

const Tour = ({ id, name, info, image, price, removeTour }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <article className="single-tour">
      <img src={image} alt="" />
      <div>
        <h4>{name}</h4>
        <h4 className="tour-price">{price}</h4>
        <p className="tour-info">
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button onClick={() => setReadMore(!readMore)}>toggle</button>
        </p>
        <button
          type="btn"
          className="delete-btn"
          onClick={() => removeTour(id)}
        >
          Not Interested
        </button>
      </div>
    </article>
  );
};

export default Tour;
