import React, { Component } from "react"
import { Button } from "antd"
import { Link } from "react-router-dom"



class Home extends Component {
    render(){
        return (
            <div>
                我的 home 组件
                <div>
                    <Button type="primary" >Button</Button>
                    <Link to="/" >Home</Link>
                    <Link to="/about" >about</Link>
                </div>
            </div>
        )
    }
}


export default Home
