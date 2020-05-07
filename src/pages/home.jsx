import React, { Component } from "react"
import { Button } from "antd"
import { Link } from "react-router-dom"
import { connect } from "react-redux"


class Home extends Component {

    handleClick = () => {
        var action = {
            type: "add"
        }
        this.props.add( action )
    }

    render(){
        console.log( this.props )
        return (
            <div>
                我是 count：{ this.props.count }
                <div>
                    <Button type="primary" onClick={ this.handleClick } >Button</Button>
                    <Link to="/" >Home</Link>
                    <Link to="/about" >about</Link>
                </div>
            </div>
        )
    }
}

function mapState( state ){
    console.log( state )
    return {
        count: state.countState.count
    }
}

function mapDispatch( dispatch ){
    return {
        add( action ){
            dispatch( action )
        }
    }
}


export default connect( mapState, mapDispatch )(Home)
