import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import SetupSection from "./SetupSection";
import QuizSection from "./QuizSection";
import ResultSection from "./ResultSection";

const Main = () => {
  const [showSetup, setShowSetup] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [quizSetup, setQuizSetup] = useState({
    category: "",
    difficulty: "",
    quiz_length: "",
    setup_complete: false,
  });
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState({
    currentScore: 0,
    correct: 0,
  });
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState({
    correct_option: "",
    selectedOption: "",
  });
  const [clicked, setClicked] = useState(false);
  const [options, setOptions] = useState([]);
  const [completed, setCompleted] = useState(false);

  // USE EFFECTS
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        const categories = data.trivia_categories.map((data) => ({
          id: data.id,
          category: data.name,
        }));
        setCategoryData(categories);
      });
  }, []);

  useEffect(() => {
    if (
      quizSetup.setup_complete &&
      quizSetup.category !== "" &&
      quizSetup.difficulty !== "" &&
      quizSetup.quiz_length !== ""
    ) {
      fetch(
        `https://opentdb.com/api.php?amount=${quizSetup.quiz_length}&category=${quizSetup.category}&difficulty=${quizSetup.difficulty}&type=multiple&encode=url3986`
      )
        .then((response) => response.json())
        .then((data) => setQuiz(data.results))
        .catch((error) =>
          console.error("Error fetching quiz questions:", error)
        );
    }
  }, [
    quizSetup.setup_complete,
    quizSetup.category,
    quizSetup.difficulty,
    quizSetup.quiz_length,
  ]);

  useEffect(() => {
    if (quiz && quiz.length > 0) {
      setQuestion(quiz[index]);
      setClicked(false); // Reset clicked state when question changes
    }

    if ((index === quiz.length - 1) && clicked ) {
      setCompleted(true);
      
    } 
  }, [index, quiz.length, clicked]);

  useEffect(() => {
    if (question && question.correct_answer) {
      const decodedCorrectAnswer = decodeURIComponent(question.correct_answer);
      setAnswer((prevState) => ({
        ...prevState,
        correct_option: decodedCorrectAnswer,
      }));
    }
  }, [question]);

  useEffect(() => {
    if (clicked && answer.selectedOption && answer.correct_option) {
      if (answer.selectedOption === answer.correct_option) {
        setScore((prevScore) => ({
          ...prevScore,
          correct: prevScore.correct + 1,
        }));
      }
      setClicked(false); // Reset clicked state after checking answer
    }
  }, [clicked, answer.selectedOption, answer.correct_option]);

  useEffect(() => {
    if (question && question.incorrect_answers && question.correct_answer) {
      const decodedIncorrectAnswers = question.incorrect_answers.map((answer) =>
        decodeURIComponent(answer)
      );
      const decodedCorrectAnswer = decodeURIComponent(question.correct_answer);
      setOptions([...decodedIncorrectAnswers, decodedCorrectAnswer]);
    }
  }, [question]);

  // FUNCTIONS

  function handleStartSetup() {
    setShowSetup(true);
  }

  function handleQuizSetup(identifier, value) {
    setQuizSetup({
      ...quizSetup,
      [identifier]: value,
    });
  }

  function handleStartQuiz() {
    if (
      quizSetup.category !== "" &&
      quizSetup.difficulty !== "" &&
      quizSetup.quiz_length !== "" &&
      !quizSetup.setup_complete
    ) {
      setQuizSetup({
        ...quizSetup,
        setup_complete: true,
      });
    }
  }

  const handleNextQuestion = () => {
    if (quiz && index < quiz.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setClicked(false)
    }
  };

  function handleSelectOption(option) {
    if (!clicked) {
      // Only update selectedOption if an option hasn't been clicked yet
      setAnswer({ ...answer, selectedOption: option });
      setClicked(true); // Set clicked to true after an option is clicked
      handleNextQuestion(); // Move to the next question
    }
  }

  const categoryName = categoryData.find(
    (category) => category.id == quizSetup.category
  )?.category;

  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const shuffledOptions = shuffleOptions(options);
  const renderOptions = shuffledOptions.map((option, index) => (
    <li key={index} onClick={() => handleSelectOption(option)} value={option}>
      {option}
    </li>
  ));

  console.log(score);

  return (
    <main>
      {!showSetup && !quizSetup.setup_complete && (
        <HeroSection startSetup={handleStartSetup} />
      )}
      {showSetup && !quizSetup.setup_complete && (
        <SetupSection
          categoryData={categoryData}
          handleQuizSetup={handleQuizSetup}
          handleStartQuiz={handleStartQuiz}
        />
      )}
      {quizSetup.setup_complete && !completed && (
        <QuizSection
          quiz={quiz}
          categoryName={categoryName}
          index={index}
          score={score}
          question={question}
          renderOptions={renderOptions}
        />
      )}

      {completed && (
        <ResultSection
          score={score.correct}
          setScore={setScore}
          quizLength={quiz.length}
          setShowSetup={setShowSetup}
          quizSetup={quizSetup}
          setQuizSetup={setQuizSetup}
          completed={completed}
          setCompleted={setCompleted}
          setClicked={setClicked}
          setIndex={setIndex}
          question={question}
          setQuestion={setQuestion}
          quiz={quiz}
          setQuiz={setQuiz}
          setOptions={setOptions}
        />
      )}
    </main>
  );
};

export default Main;
