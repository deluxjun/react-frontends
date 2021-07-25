import React, { useState, useContext, useEffect } from "react";
import useSound from "use-sound";
import soundFile1 from "./eat.wav";

// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const AppContext = React.createContext();

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

const initDots = [
  [2, 4],
  [4, 4],
];
const initTarget = [10, 10];
const initDirection = [RIGHT];

const STATUS_GOING = 0;
const STATUS_PAUSE = 1;
const STATUS_GAMEOVER = 2;

const AppProvider = ({ children }) => {
  const [dots, setDots] = useState(initDots);
  const [target, setTarget] = useState(initTarget);
  const [direction, setDirection] = useState(initDirection);
  const [intervalTime, setIntervalTime] = useState(300);
  const [status, setStatus] = useState(STATUS_GOING);
  const [got, setGot] = useState(false);
  const [count, setCount] = useState(1);
  const [initLevel, setInitLevel] = useState(1);

  const [playEat1] = useSound(soundFile1);

  const handleKeyDown = async (key) => {
    // console.log(key);
    if (key === 32) {
      if (status === STATUS_GOING) setStatus(STATUS_PAUSE);
      if (status === STATUS_PAUSE) setStatus(STATUS_GOING);
      // console.log(status);
    }
    if (key === LEFT || key === UP || key === RIGHT || key === DOWN) {
      setDirection((old) => {
        if (old[old.length - 1] !== key) {
          const n = [...old, key];
          return n;
        }
        return old;
      });
    }
  };
  // restartGame
  const restartGame = (params) => {
    // setCount(initLevel);
    // setDots(initDots);
    // setDirection(initDirection);
    // setIntervalTime(300);
    setLevel(initLevel);
    setStatus(STATUS_GOING);
  };

  const moveSnake = async () => {
    if (direction.length === 0) return;

    setDots((oldDots) => {
      let head = oldDots[oldDots.length - 1];
      let newHead = null;
      if (direction.length > 0) {
        let dir = direction[0];
        if (direction.length > 1) {
          setDirection(direction.slice(1));
        }
        if (LEFT === dir) {
          newHead = [head[0] - 2, head[1]];
        } else if (RIGHT === dir) {
          newHead = [head[0] + 2, head[1]];
        } else if (UP === dir) {
          newHead = [head[0], head[1] - 2];
        } else if (DOWN === dir) {
          newHead = [head[0], head[1] + 2];
        }
      }
      if (newHead === null) return oldDots;

      let newDots = [...oldDots, newHead];
      if (!got) newDots.shift();
      else setGot(false);
      return newDots;
    });
  };

  // check collision
  const checkSafe = (params) => {
    let head = dots[dots.length - 1];
    // console.log(head);

    // check target
    if (head[0] == target[0] && head[1] == target[1]) {
      // addTail()
      gotTarget();
    }

    if (head[0] > 98 || head[0] < 0 || head[1] > 98 || head[1] < 0) {
      console.log("head : ", head);
      return false;
    }
    return true;
  };

  const setLevel = (level) => {
    if (!level) return;
    if (level > 40) level = 40;
    setInitLevel(level);

    setCount(level - 1);
    // set dots
    let c = 0;
    let newDots = [...initDots];
    while (c++ < level) {
      const head = newDots[newDots.length - 1];
      newDots.push([head[0] + 2, head[1]]);
    }
    setDots(newDots);
    gotTarget();
    // set speed
  };

  const setNewSpeed = (count) => {
    setIntervalTime((time) => {
      if (time > 20) {
        // console.log(300 / Math.sqrt(count));
        return 300 / Math.sqrt(count);
      }
      return 20;
    });
  };

  const playSounds = () => {
    playEat1();
  };

  // refresh target
  const gotTarget = (params) => {
    let i = 0;
    let randLeft = Math.floor(Math.random() * 49) * 2;
    let randTop = Math.floor(Math.random() * 49) * 2;
    setTarget([randLeft, randTop]);
    setGot(true);
    setCount((c) => {
      setNewSpeed(c + 1);
      return c + 1;
    });
    // speed up
    // setIntervalTime((oldTime) => {
    //   // if (oldTime > 200) return oldTime - 20;
    //   // else if (oldTime > 150) return oldTime - 10;
    //   // else if (oldTime > 50) return oldTime - 5;
    //   // else if (oldTime > 20) return oldTime - 2;
    //   // return oldTime;
    //   console.log("time : ", oldTime);
    //   if (oldTime > 20) return 300 / Math.sqrt(count);
    //   return 20;
    // });

    console.log("count", count);
    playSounds();
  };

  const intervalFunc = async () => {
    if (checkSafe() === false) setStatus(STATUS_GAMEOVER);
    moveSnake();
  };

  // init
  useEffect(() => {
    if (status != STATUS_GOING) {
      return;
    }

    const timer = setInterval(() => {
      intervalFunc();
    }, intervalTime);
    return () => {
      clearInterval(timer);
      // console.log("clear timer");
    };
  }, [direction, status, dots]);

  // render
  return (
    <AppContext.Provider
      value={{
        setLevel,
        restartGame,
        handleKeyDown,
        count,
        dots,
        target,
        status,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
