import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../question.js";
import Answers from "./Answers.jsx";

export default function Question({ questionText, answers, selectedAnswer, onSkipAnswer, onSelect, answerState }) {


    return <div id="question">
        <QuestionTimer timeout={5000} onTimeout={onSkipAnswer} />
        <h2>
            {questionText}
        </h2>
        <Answers answers={answers} selectedAnswer={selectedAnswer} answerState={answerState} onSelect={onSelect} />
    </div>
}