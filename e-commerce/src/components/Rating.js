import React from "react";

const Rating = ({ rating, numReviews }) => {
  let classNames = [];
  let i = 0;
  while (i++ < Math.floor(rating)) {
    classNames.push("fa fa-star");
  }

  if (i - rating > 0 && i - rating < 1) {
    classNames.push("fa fa-star-half-o");
  }

  i = Math.round(rating);
  while (i++ < 5) {
    classNames.push("fa fa-star-o");
  }

  return (
    <div className="rating">
      {classNames.map((c) => {
        return (
          <span>
            <i className={c}></i>
          </span>
        );
      })}
      <span>{numReviews + " reviews"}</span>
    </div>
  );
};

export default Rating;
