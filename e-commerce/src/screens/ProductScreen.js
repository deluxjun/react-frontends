import React from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";

import data from "../data";

const ProductScreen = () => {
  const { id } = useParams();
  const product = data.products.find((p) => p._id === id);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  const { image, name, rating, numReviews, price, description, countInStock } =
    product;

  return (
    <div>
      <Link to="/">Back to result</Link>
      <div className="row top">
        <div className="col-2">
          {/* image */}
          <img className="large" src={image} alt={name} />
        </div>
        <div className="col-1">
          {/* detail */}
          <ul>
            <li>
              <h1>{name}</h1>
            </li>
            <li>
              <Rating rating={rating} numReviews={numReviews}></Rating>
            </li>
            <li>Price: ${price}</li>
            <li>
              Description <p>{description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          {/* cart */}
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="error">Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button className="primary block">Add to Cart</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
