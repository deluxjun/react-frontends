import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [category, setCategory] = useState("All");

  const getItems = () => {
    console.log(category);
    if (category === "All") return items;
    return items.filter((i) => i.category === category);
  };

  return (
    <main className="section">
      <header>
        <h2 className="title">Our Menu</h2>
        <p className="underline" />
      </header>
      <Menu
        className="menu"
        menuItems={menuItems}
        selectCategory={setCategory}
      ></Menu>
      <Categories items={getItems()}></Categories>
    </main>
  );
}

export default App;
