import React from "react";
import heroImage from "../quiz-logo.png";

const HeroSection = ({ startSetup }) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="heading">
          <h1 className="title">QuizUp</h1>
          <p className="subtitle">
            Master your knowledge, one question at a time
          </p>
        </div>

        <div className="hero-image">
          <img src={heroImage} />
        </div>

        <div className="btn start-btn">
          <button onClick={startSetup}>Next</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
