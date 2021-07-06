import React from 'react';

const List = ({data}) => {
  return (
    <>
      {data.map((p) => {
        const {id, name, age, image} = p;
        return (
          <article className="person" key={id}>
            <img src={image} alt="" />
            <div><h4>{name}</h4>
            <p>{age}</p></div>
          </article>
        )
      })}
    </>
  );
};

export default List;
