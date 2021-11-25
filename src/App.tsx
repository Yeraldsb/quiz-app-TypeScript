// @ts-ignore
import React, {useState} from 'react';
import QuestionCard from "./components/QuestionCard";
import {Difficulty, QuestionState, fetchQuizQuestion} from "./API";


type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}
const TOTAL_QUESTIONS = 10;

const App = () => {

    const [loading, setLoading] = useState(false);
    const [questions, setQuestion] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswer, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);

    console.log(fetchQuizQuestion(TOTAL_QUESTIONS, Difficulty.EASY))

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);

        const newQuestion = await fetchQuizQuestion(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        );
        setQuestion(newQuestion);
        setScore(0);
        setUserAnswers([]);
        setNumber(0)

    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    }

    const nextQuestion = () => {

    }
    return (
        <div className="App">
            <h1>React Quizz</h1>
            <button className="start" onClick={startTrivia}>
                Start
            </button>
            <p className="score"> Score :</p>
            <p className="loading">Loading Questions ...</p>

            <button className="next" onClick={nextQuestion}>
                Next Question!
            </button>
        </div>
    );
}

export default App;
