import {useCallback, useState} from "react";

import QUESTIONS from '../question.js'
import quizCompleteImg from "../assets/quiz-complete.png"
import QuestionTImer from "./QuestionTImer.jsx";

export default function Quiz(props) {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length
    console.log(quizIsComplete)

    const handleSelectAnswer = useCallback((answer) => {
        setUserAnswers(prevAnswer => [...prevAnswer, answer])
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizCompleteImg} alt="Quiz Complete" />
            <h2>Quiz Completed!</h2>
        </div>
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort((a, b) => Math.random() - 0.5)


    return (
        <div id="quiz">
            <div id="question">
                <QuestionTImer key={activeQuestionIndex} timeout={1000} onTimeout={handleSkipAnswer} />
                <h2>
                    {QUESTIONS[activeQuestionIndex].text}
                </h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer, index) => {
                        return <li key={answer} className="answer"><button onClick={() => handleSelectAnswer(answer)}>{answer}</button></li>
                    })}
                </ul>
            </div>
        </div>
    )
}