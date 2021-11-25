// @ts-ignore
import React, {useState} from 'react';
import QuestionCard from "./components/QuestionCard";
import {Difficulty, QuestionState, fetchQuizQuestion} from "./API";
import './app.css'


export type AnswerObject = {
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
        setLoading(false);

    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            //users answers
            const answer = e.currentTarget.value;
            //check the answer against the correct answer
            const correct = questions[number].correct_answer === answer;
            // Add score if answer is correct
            if (correct) setScore(prev => prev + 1);

            // Save answer in the array for user answer
            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            }
            setUserAnswers(prev => [...prev, answerObject]);
        }
    }

    const nextQuestion = () => {

        //Move on to the next questio if no the last question
        const nextQuestion = number + 1;

        if (nextQuestion === TOTAL_QUESTIONS) {
            setGameOver(true);
        } else {
            setNumber(nextQuestion);
        }

    }
    return (
        <div className="app-container">
            <h1 className="nameApp">React Quizz</h1>
            {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
                <button className="start" onClick={startTrivia}>
                    Start
                </button>
            ) : null}
            {!gameOver ? <p className="score"> Score :{score}</p> : null}
            {loading && <p className="loading">Loading Questions ...</p>}
            {!loading && !gameOver && (
                <QuestionCard
                    question={questions[number].question}
                    answers={questions[number].answer}
                    callback={checkAnswer}
                    userAnswer={userAnswer ? userAnswer[number] : undefined}
                    questionNr={number + 1}
                    totalQuestions={TOTAL_QUESTIONS}
                />
            )}

            {!gameOver &&
            !loading &&
            userAnswer.length === number + 1
            && number !== TOTAL_QUESTIONS - 1 ? (
                <button className="next" onClick={nextQuestion}>
                    Next Question!
                </button>
            ) : null}
        </div>
    )
        ;
}

export default App;
