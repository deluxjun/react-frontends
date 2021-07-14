import React from "react";
import { FaTimes } from "react-icons/fa";
import sublinks from "./data";
import useGlobalContext from "./context";

const Sidebar = () => {
  const { isOpenSidebar, closeSidebar } = useGlobalContext();
  return (
    <div
      className={`${
        isOpenSidebar ? "sidebar-wrapper show" : "sidebar-wrapper"
      }`}
    >
      {isOpenSidebar && (
        <div className="sidebar">
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
          <div className="sublinks">
            {sublinks.map(({ page, links }, index) => {
              return (
                <article key={index}>
                  <h4>{page}</h4>
                  <div className="sidebar-sublinks">
                    {links.map(({ url, icon, label }, index) => {
                      return (
                        <a key={index} href={url}>
                          {icon}
                          {label}
                        </a>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
