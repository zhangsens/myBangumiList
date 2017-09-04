import React from "react"
import { connect } from 'react-redux'

const Me = connect(
    (state)=>({target:state.target})
)(class Me extends React.Component{
    render(){
        var { target } = this.props;
        target = target?target:"tMe";
        return (
            <div className={target=="tMe"?"me":"me blurred"} id="me">
                Me
            </div>
        )
    }
})

export { Me }