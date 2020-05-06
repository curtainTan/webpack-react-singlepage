import React, { Component } from "react"
import ReactDOM from "react-dom"
import "./style/index.css"
import "./style/test.less"
import { Button } from "antd"
import { HashRouter,  } from "react-router-dom"


class App extends Component {
    render(){
        return (
            <div>
                你好--
                <Button type="primary" >你好</Button>
            </div>
        )
    }
}



ReactDOM.render( <App />, document.getElementById("app") )



