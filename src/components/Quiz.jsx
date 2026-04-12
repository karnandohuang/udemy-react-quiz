import {useCallback, useRef, useState} from "react";

import QUESTIONS from '../question.js'
import quizCompleteImg from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";

export default function Quiz(props) {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length
    console.log('render quiz', quizIsComplete)

    const handleSelectAnswer = useCallback((answer) => {
        setUserAnswers(prevAnswer => [...prevAnswer, answer])
    }, [])

    const handleSkipAnswer = useCallback(() => {
        console.log('skip')
        handleSelectAnswer(null)
    }, [handleSelectAnswer])

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizCompleteImg} alt="Quiz Complete" />
            <h2>Quiz Completed!</h2>
        </div>
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelect={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}