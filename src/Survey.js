import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./survey.css";
import axios from "axios";

const Survey = ({ data, completed, completeSurvey }) => {

    const [currentSectionNumber, setCurrentSectionNumber] = useState(0)
    const [currentSection, setCurrentSection] = useState(data.sections[0])
    const [title, setTitle] = useState(currentSection.title)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [questionId, setQuestionId] = useState(currentSection.questionIds[questionIndex]);
    const [question, setQuestion] = useState("...")
    const [answer, setAnswer] = useState("");
    const [bar, setBar] = useState(0);



    useEffect(() => {
        fetchQuestion(questionId)
        setQuestionId(currentSection.questionIds[questionIndex])
        setTitle(currentSection.title)
        if(bar === getTotal(data.sections)-1 ) {
            completeSurvey();
        }

        return () => {
            if (bar === getTotal(data.sections)-1) {
                setTitle("")
                setQuestionId("")
                setBar(0)
                setQuestionIndex(0)
                setCurrentSectionNumber(0)
                setCurrentSection(null)
                setAnswer("")
                setQuestion("")
                console.log("unmounted from survey")
            }
        }

    }, [bar, questionId, questionIndex])



    async function fetchQuestion(id){
        await axios.get(`https://run.mocky.io/v3/${id}`)
            .then(res => res.data)
            .then(data => {
                setQuestion(data.questionText)
            })
            .catch(err => console.log(err))
    }


    const handleContinue = (e) => {
        e.preventDefault()
        setBar(bar + 1)

        if(questionIndex >= currentSection.questionIds.length-1){
            setCurrentSectionNumber(currentSectionNumber + 1)
            setCurrentSection(data.sections[currentSectionNumber + 1])
            setQuestionIndex(0)
        }
        else {setQuestionIndex( prev => prev + 1)}
    }



    function getTotal(arr) {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i].questionIds.length;
        }
        return total; }


    return (
        <div>
            <hr />
            <Header title={title} />
            {questionIndex}
            <form onSubmit={handleContinue}>
                <div className="container">
                    <div className="question">
                        <label htmlFor="answer">{question}</label>
                    </div>
                    <div className="input-class">
                        <input
                            onChange={() => {}}
                            id="answer"
                            type="text"
                            placeholder="Answer"
                            value={""}
                        />
                    </div>

                    <div className="continue">
                        <button type="submit" disabled={completed}>continue </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Survey;
