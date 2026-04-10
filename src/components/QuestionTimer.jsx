import {useEffect, useState} from "react";


export default function QuestionTimer({ timeout = 3000, onTimeout }) {
    const [timer, setTimer] = useState(timeout)

    useEffect(() => {
        console.log('setTimeout')
        const timer = setTimeout(onTimeout, timeout)
        return () => {
            clearTimeout(timer)
        }
    }, [timeout, onTimeout]);

    useEffect(() => {
        console.log('setInterval')
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 10)
        }, 10)
        return () => {
            clearInterval(interval)
        }
    }, []);

    return <progress id="question-time" max={timeout} value={timer}></progress>
}