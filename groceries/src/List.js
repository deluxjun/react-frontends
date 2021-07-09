import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, editItem, removeItem }) => {
  return (
    <>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <div>{item.text}</div>
            <div>
              <button onClick={() => editItem(item.id)}>
                <FaEdit />
              </button>
              <button onClick={() => removeItem(item.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;
