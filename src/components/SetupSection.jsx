import React, { useState } from "react";


const SetupSection = ({ categoryData, handleQuizSetup, handleStartQuiz }) => {


  const categories = categoryData.map((data, index) => {
    return <option key={index + 1} value={data.id}>{data.category}</option>
  });

  
  return (
    <>
      <section className="setup">
        <div className="container">
          <div className="heading">
            <h2 className="title">Choose your challenge:</h2>
            <p className="subtitle">Customize your quiz</p>
          </div>

          <div className="preferences">
            <span>
              <h3 >Category</h3>
              <select onChange={(e) => handleQuizSetup("category", e.target.value)}>
                <option value={""}>Click</option>
                {categories}
              </select>
            </span>
            <span>
              <h3>Difficulty</h3>
              <select onChange={(e) => handleQuizSetup("difficulty", e.target.value)}>
                <option value={""}>Click</option>
                <option value={"easy"}>Easy</option>
                <option value={"medium"}>Medium</option>
                <option value={"hard"}>Hard</option>
              </select>
            </span>
            <span>
              <h3>Quiz Length</h3>
              <select onChange={(e) => handleQuizSetup("quiz_length", e.target.value)}>
                <option value={""}>Click</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </span>
          </div>

          <div className="btn start-quiz">
            <button onClick={handleStartQuiz}>Start Quiz</button>
          </div>
        </div>
      </section>

    
    </>
  );
};

export default SetupSection;
