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
    const [question, setQuestion] = useState("")
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

    async function postResults(){
        await axios.post("https://run.mocky.io/v3/b081763d-eef1-44ab-8bab-3ce008c49bdf", {answer: answer})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    const handleContinue = (e) => {
        e.preventDefault()
        setBar(bar + 1)
        postResults();
        setAnswer("")
        if(questionIndex >= currentSection.questionIds.length-1){
            setCurrentSectionNumber(currentSectionNumber + 1)
            setCurrentSection(data.sections[currentSectionNumber + 1])
            setQuestionIndex(0)
        }
        else {setQuestionIndex( prev => prev + 1)}

    }

    const handleChange = (e) => {
        setAnswer(e.target.value)
    }

    function getTotal(arr) {
        let total = 0;
        arr.forEach(el => total += el.questionIds.length)
        return total;
    }


    const getBarItems = () => {
        let arr = []
        for(let i = 1; i <= getTotal(data.sections); i++){
            arr.push(i)
        }
        return arr
    }

    const barWidth = 100 / (getTotal(data.sections) - 1)



    const barSpan = () => {
        let arr = [];
        for(let i = 1; i <= bar; i ++){
            arr.push("")
        }
        return (

        arr.map((el, i) =>
            <span style={{
                backgroundColor: "#20e531",
                width: `${barWidth}%`,
                borderRadius: i === 0 ? "15px 0px 0px 15px" :
                    i === getBarItems().length-1 ? "0px 15px 15px 0px" : "0px 0px 0px 0px"
            }}
                  key={i}>{el}</span>)
    ) }


    return (
        <div>
            <hr />
            <Header title={title} />
            <form onSubmit={handleContinue}>
                <div className="container">
                    <div className="item question">
                        <label htmlFor="answer"><h3>{question}</h3></label>
                    </div>
                    <div className="item input-class">
                        <input
                            onChange={handleChange}
                            id="answer"
                            type="text"
                            placeholder="Answer"
                            required
                            value={answer}
                        />
                    </div>
                    <div className="item continue">
                        <button type="submit" disabled={completed}>continue </button>
                    </div>
                    <div className="bar">{ barSpan() }</div>
                </div>
            </form>
        </div>
    );
};

export default Survey;
