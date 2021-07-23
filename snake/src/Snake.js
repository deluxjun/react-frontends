import React, { useState, useEffect } from "react";
import { useGlobalContext } from "./context";
import snakeHead from "./snake-head.png";

const Snake = () => {
  const borderRef = React.useRef(null);
  const { dots, target, handleKeyDown, status, count, restartGame } =
    useGlobalContext();
  useEffect(() => {
    borderRef.current.focus();
  }, []);
  return (
    <main className="section">
      <div
        ref={borderRef}
        className="border"
        onKeyDown={(e) => {
          if (e.keyCode >= 37 && e.keyCode <= 40) e.preventDefault();
          handleKeyDown(e.keyCode);
        }}
        tabIndex="0"
      >
        {status === 2 && (
          <>
            <h2>GAME OVER</h2>
            <button
              onClick={() => {
                restartGame();
                borderRef.current.focus();
              }}
            >
              restart
            </button>
          </>
        )}
        {status === 1 && <h2>PAUSE</h2>}

        {dots.map((dot, index) => {
          return (
            <div
              key={index}
              className="snake-dot"
              style={{
                left: `${dot[0]}%`,
                top: `${dot[1]}%`,
                backgroundImage: `url(${snakeHead})`,
              }}
            ></div>
          );
        })}
        <div
          className="target"
          style={{ left: `${target[0]}%`, top: `${target[1]}%` }}
        >
          {count}
        </div>
      </div>
    </main>
  );
};

export default Snake;
