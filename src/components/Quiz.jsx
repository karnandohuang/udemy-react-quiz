import {useCallback, useRef, useState} from "react";

import QUESTIONS from '../question.js'
import quizCompleteImg from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";

export default function Quiz(props) {
    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = answerState ? userAnswers.length - 1 : userAnswers.length

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length
    console.log(quizIsComplete)

    const handleSelectAnswer = useCallback((answer) => {
        setAnswerState('answered')
        setUserAnswers(prevAnswer => [...prevAnswer, answer])

        setTimeout(() => {
            console.log('hehe', answer === QUESTIONS[activeQuestionIndex].answers[0])
            if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }
            setTimeout(() => {
                setAnswerState('')
            }, 2000)
        }, 1000)
    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

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
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSelect={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}