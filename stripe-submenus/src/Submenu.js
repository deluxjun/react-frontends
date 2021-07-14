import React, { useState, useRef, useEffect } from "react";
import useGlobalContext from "./context";

const Submenu = () => {
  const container = useRef();
  const { isOpenMenu, location } = useGlobalContext();

  React.useEffect(() => {
    const submenu = container.current;
    submenu.style.left = `${location.center}px`;
    submenu.style.top = `${location.bottom}px`;
    console.log("reset position");
  }, [location]);

  return (
    <aside
      className={`${isOpenMenu ? "submenu show" : "submenu"}`}
      ref={container}
    >
      {isOpenMenu && (
        <section className="submenu-center">
          <a href="">1111</a>
          <a href="">2222</a>
          {/* {links.map((link, index) => {
            const { url, icon, label } = link
            return (
              <a key={index} href={url}>
                {icon}
                {label}
              </a>
            )
          })} */}
        </section>
      )}
    </aside>
  );
};

export default Submenu;
