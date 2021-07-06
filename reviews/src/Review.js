import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
  // const [people, setPeople] = useState(people);
  const [index, setIndex] = useState(0);

  // const findPerson = (id) => {
  //   people.findIndex()
  // }

  const randomReview = () => {
    setIndex(Math.floor(Math.random() * people.length));
  };
  const decIndex = (params) => {
    if (index > 0) setIndex(index - 1);
  };

  const incIndex = (params) => {
    if (index < people.length - 1) setIndex(index + 1);
  };

  console.log(index);
  const { name, job, image, text } = people[index];

  console.log(people[index]);
  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt="" className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4>{name}</h4>
      <p>{text}</p>
      <div>
        <FaChevronLeft className="prev-btn" onClick={decIndex} />
        <FaChevronRight className="next-btn" onClick={incIndex} />
      </div>
      <button type="btn" onClick={randomReview} className="random-btn">
        Surprise me
      </button>
    </article>
  );
};

export default Review;
