import React from "react"
import { connect } from 'react-redux'

import fs from 'fs'
var exist = fs.existsSync("./data");
if(exist){
    var bangumi_looking = fs.existsSync("./data/looking.data");
    if(!bangumi_looking){
        fs.writeFileSync("./data/looking.data","");
    }
    var bangumi_looked = fs.existsSync("./data/looked.data");
    if(!bangumi_looked){
        fs.writeFileSync("./data/looked.data","");
    }
}else{
    fs.mkdirSync("./data");
    fs.writeFileSync("./data/looking.data","");
    fs.writeFileSync("./data/looked.data","");
}


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