import {useCallback, useRef, useState} from "react";

import QUESTIONS from '../question.js'
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

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
        return <Summary userAnswers={userAnswers} />
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