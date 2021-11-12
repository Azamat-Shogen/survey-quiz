import './App.css';
import React from "react";
import Survey from "./Survey";
import axios from "axios";
import "./App.css";
import AllSet from "./AllSet";

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
         return <div>
             { error ? <div>{error}</div> :
                 <div>
                     <div> {data.surveyName} </div>
                     {!started ? <button type="button"
                                         onClick={this.handleStartSurvey}>Start survey</button> :
                         <Survey data={data} completed={completed} completeSurvey={this.completeSurvey} />}
                 </div>
             }
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
