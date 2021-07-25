import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useGlobalContext } from "./context";
import snakeHead from "./snake-head.png";

const Snake = () => {
  const borderRef = React.useRef(null);
  const restartRef = React.useRef(null);
  const { dots, target, handleKeyDown, status, count, restartGame, setLevel } =
    useGlobalContext();
  const search = useLocation().search;
  const level = new URLSearchParams(search).get("level");
  useEffect(() => {
    borderRef.current.focus();
    setLevel(level);
  }, []);

  useEffect(() => {
    if (status === 2) restartRef.current.focus();
  }, [status]);

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
          <div className="restart-wrapper">
            <h2 className="gameover">GAME OVER</h2>
            <button
              ref={restartRef}
              className="restart-btn"
              onClick={() => {
                restartGame();
                borderRef.current.focus();
              }}
            >
              restart
            </button>
          </div>
        )}
        {status === 1 && (
          <div className="restart-wrapper">
            <h2 className="gameover">PAUSE</h2>
          </div>
        )}

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
