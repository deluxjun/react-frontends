import React from "react";
import phoneImg from "./images/phone.svg";
import useGlobalContext from "./context";

const Hero = () => {
  const { closeOpenMenu } = useGlobalContext();
  return (
    <main className="hero" onMouseOver={closeOpenMenu}>
      <div className="hero-center">
        <section className="hero-info">
          <h1>
            Payments infrastructure <br />
            for the internet
          </h1>
          <p>
            Millions of companies of all sizes—from startups to Fortune 500s—use
            Stripe’s software and APIs to accept payments, send payouts, and
            manage their businesses online.
          </p>
          <button>Start Now</button>
        </section>
        <div className="hero-images">
          <img src={phoneImg} className="phone-img"></img>
        </div>
      </div>
    </main>
  );
};

export default Hero;
