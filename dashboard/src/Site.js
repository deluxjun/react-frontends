import React, { useState, useEffect } from "react";

const Site = ({ title, url, image }) => {
  return (
    <article className="site">
      <a target="_blank" href={url}>
        <img src={image}></img>
      </a>
      <div className="site-info">
        <h4>{title}</h4>
      </div>
    </article>
  );
};

export default Site;
