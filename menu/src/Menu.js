import React from "react";

// const menus = ["All", "breakfast", "lunch", "shakes"];
const Menu = ({ menuItems, selectCategory }) => {
  const menus = ["All", ...new Set(menuItems.map((item) => item.category))];
  console.log(menus);
  return (
    <div>
      <div className="btn-container">
        {menus.map((m) => {
          return (
            <button
              key={m}
              className="filter-btn"
              onClick={() => selectCategory(m)}
            >
              {m}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
