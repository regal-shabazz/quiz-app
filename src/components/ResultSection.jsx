import React from 'react'
import resultimg from "../result.png"

const ResultSection = ({ score, setScore, quizLength, setShowSetup, setQuizSetup, quizSetup, completed, setCompleted, setClicked, setIndex, question, setQuestion, setQuiz, setOptions }) => {


  function handleRestart() {
    setShowSetup(false)
    setQuizSetup({...quizSetup, setup_complete: false})
    setCompleted(false)
    setClicked(false)
    setIndex(0)
    setQuestion([])
    setScore({...score, currentScore: 0, correct: 0})
    setQuiz([])
    setOptions([])
  }
  return (
    <section className='result'>
      <div className='container'>
        <div className='heading'>
          <h3>Quiz result</h3>
        </div>

        <div>
          <img src={resultimg} />
        </div>

        <div className='score'>
          { <p>You got {score} of {quizLength} correctly</p> }
        </div>

        <div className='btn play-again'>
          <button onClick={handleRestart}>Play Again</button>
        </div>
      </div>
    </section>
  )
}

export default ResultSection