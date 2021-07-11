import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Home = () => {
  const context = useGlobalContext();
  const { showSidebar, showModal } = context;
  return (
    <main>
      <button type="btn" className="sidebar-toggle" onClick={showSidebar}>
        <FaBars />
      </button>
      <button type="btn" className="btn" onClick={showModal}>
        Modal
      </button>
    </main>
  );
};

export default Home;
