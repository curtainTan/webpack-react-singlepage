import React, { Component } from "react"
import ReactDOM from "react-dom"
import "./style/index.css"
import "./style/test.less"


class App extends Component {
    render(){
        return (
            <div>你好--</div>
        )
    }
}



ReactDOM.render( <App />, document.getElementById("app") )



