import React, { Component } from "react"
import ReactDOM from "react-dom"
import { HashRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"

import Home from "./pages/home"
import "./style/index.css"
import store from "./store/index"


class App extends Component {
    render(){
        return (
            <Provider store={ store } >
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
            </Provider>
        )
    }
}



ReactDOM.render( <App />, document.getElementById("app") )



