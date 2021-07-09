import React from "react";

const Categories = ({ items }) => {
  console.log(items);
  return (
    <section className="section-center">
      {items.map((i) => {
        const { id, title, price, img, desc } = i;
        return (
          <div key={id} className="menu-item">
            <img className="photo" src={img}></img>
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">${price}</h4>
              </header>
            </div>
            <p className="item-text">{desc}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Categories;
