import './App.css';
import React from "react";
import Survey from "./components/Survey";
import axios from "axios";
import "./App.css";
import AllSet from "./components/AllSet";

 class App extends React.Component{
     constructor(props) {
         super(props);

         this.state = {
             loading: true,
             started: false,
             data: null,
             error: "",
             completed: false
         }
     }

     componentDidMount() {
        this.fetchData()
     }


     async fetchData() {
        await axios.get("https://run.mocky.io/v3/e56a3256-8703-4705-a182-77cad0b702d1")
            .then(res => res.data)
            .then(data => this.setState({...this.state, loading: false, data}))
            .catch(err => this.setState({...this.state, loading: false, error: "something went wrong..."}))
     }

     handleStartSurvey = () => {
         this.setState({...this.state, started: true})
     }

     completeSurvey = () => {
         this.setState({...this.state, completed: true})
     }


     loadPage = () => {
         const {data, started, loading, error, completed } = this.state
         if(completed){ return <AllSet /> }
         if(loading) { return <div>loading...</div> }
         if(error) { return <div>{error}</div> }
         return <div>
                 <h1>{data.surveyName}</h1>
                    {!started ? <div>
                               <p>I Know what you did last summer!</p>
                                <button type="button" className="start-button"
                                             onClick={this.handleStartSurvey}>START SURVEY</button>
                                </div> :
                     <Survey data={data} completed={completed} completeSurvey={this.completeSurvey} />}
                 </div>

     }


    render() {
        return (
            <div className="App">
                {this.loadPage()}
            </div>
        );
      }
    }


export default App;
