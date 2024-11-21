import React, { Component } from "react"
import Navbar from "./components/Navbar"
import News from "./components/News"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {

    constructor(){
        super();
        this.state = {
            mode :'light'
        }
    }

    componentDidMount(){
        this.applyBodyClass();
    }

    componentDidUpdate(){
        this.applyBodyClass();
    }

    applyBodyClass(){
        const { mode } = this.state;
        document.body.className = mode ==='light'?'body-light':'body-dark'
    }

    handleMode = () =>{
        const setMode = this.state.mode === 'light' ? 'dark' : 'light';
        this.setState({
            mode : setMode
        })
    }

    state = {
        progress : 0
    }   

    setProgress = (progress) =>[
        this.setState({progress: progress})
    ]

    render() {
        return (
        <>
           <Router>
            <Navbar title="NewsMonkey" toggleMode={this.handleMode} mode={this.state.mode}/>
            <LoadingBar
                color='#f11946'
                progress={this.state.progress}
            />
                <Routes>
                        <Route path="/" element={<News setProgress={this.setProgress} country="us" key="general" category="general" mode={this.state.mode}/>}>Home</Route>
                        <Route path="/business" element={<News setProgress={this.setProgress} country="us" key="business" category="business" mode={this.state.mode}/>}>Business</Route>
                        <Route path="/entertainment" element={<News setProgress={this.setProgress} country="us" key="entertainment" category="entertainment" mode={this.state.mode}/>}>Entertainment</Route>
                        <Route path="/health" element={<News setProgress={this.setProgress} country="us" key="health" category="health" mode={this.state.mode}/>}>Health</Route>
                        <Route path="/science" element={<News setProgress={this.setProgress} country="us" key="science" category="science" mode={this.state.mode}/>}>Science</Route>
                        <Route path="/sports" element={<News setProgress={this.setProgress} country="us" key="sports" category="sports" mode={this.state.mode}/>}>Sports</Route>
                        <Route path="/technology" element={<News setProgress={this.setProgress} country="us" key="technology" category="technology" mode={this.state.mode}/>}>Technology</Route>
                </Routes>   
           </Router>
        </>
        )
    }
}
