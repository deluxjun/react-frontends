import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTwitter } from "react-icons/fa";
import { links, social } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <header className="nav-header">
          <img className="logo" src={logo} alt="" />
          <button className="nav-toggle">
            <FaBars />
          </button>
        </header>
        <section className="links-container">
          <ul className="links">
            {links.map((link) => {
              return (
                <li key={link.id}>
                  <a href={link.url}>{link.text}</a>
                </li>
              );
            })}
          </ul>
        </section>
        <ul className="social-icons">
          {social.map((soc) => {
            return (
              <li key={soc.id}>
                <a href={soc.url}>{soc.icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
