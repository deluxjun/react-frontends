import React from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import sublinks from "./data";
import useGlobalContext from "./context";

const Navbar = () => {
  const { showOpenMenu, closeOpenMenu, openSidebar } = useGlobalContext();
  const displayMenu = (e) => {
    // debugger;
    const rect = e.target.getBoundingClientRect();
    const center = (rect.left + rect.right) / 2;
    const bottom = rect.bottom - 3;
    showOpenMenu({ center, bottom });
  };
  const handleSubmenu = (e) => {
    if (!e.target.classList.contains("link-btn")) {
      closeOpenMenu();
    }
  };
  return (
    <nav className="nav" onMouseOver={handleSubmenu}>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} className="nav-logo"></img>
          <button className="btn toggle-btn" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {sublinks.map((link, index) => {
            return (
              <li key={index}>
                <button
                  className="link-btn"
                  onMouseOver={displayMenu}
                  // onMouseLeave={closeOpenMenu}
                >
                  {link.page}
                </button>
              </li>
            );
          })}
        </ul>
        <button className="btn signin-btn">Sign in</button>
      </div>
    </nav>
  );
};

export default Navbar;
