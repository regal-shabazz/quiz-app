import React, { useState, useEffect } from "react";

const QuizSection = ({
  quiz,
  categoryName,
  index,
  score,
  question,
  renderOptions,
}) => {
  

  return (
    <section className="quiz">
      <div className="container">
        <div className="heading">
          <h3>{categoryName}</h3>
        </div>
        <div className="question">
          <h2>{decodeURIComponent(question.question)}</h2>
        </div>
        <div className="options">
          <ul>{renderOptions}</ul>
        </div>
        <div className="track">
          <small>
            Question {index + 1} of {quiz.length}
          </small>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
