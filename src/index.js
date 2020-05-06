import React, { Component } from "react"
import ReactDOM from "react-dom"
import "./style/index.css"

import { HashRouter, Switch, Route } from "react-router-dom"

import Home from "./pages/home"


class App extends Component {
    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" >
                        <Home />
                    </Route>
                    <Route path="/about" >
                        <div>我是 about 页</div>
                    </Route>
                </Switch>
            </HashRouter>
        )
    }
}



ReactDOM.render( <App />, document.getElementById("app") )



