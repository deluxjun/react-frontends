import React from "react";
import logo from "./logo.svg";
import { FaTimes } from "react-icons/fa";
import { social, links } from "./data";
import { useGlobalContext } from "./context";

const Sidebar = () => {
  const { isOpenSidebar, closeSidebar } = useGlobalContext();
  // if (!isOpenSidebar) return <></>;

  return (
    <div className={isOpenSidebar ? "sidebar show-sidebar" : "sidebar"}>
      <header className="sidebar-header">
        <img src={logo}></img>
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </header>
      <ul className="links">
        {links.map((link) => {
          const { id, url, text, icon } = link;
          return (
            <li key={id}>
              <a herf={url}>
                {icon}
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
