import React from 'react'
import { connect } from 'react-redux'

const Bangumi = connect(
    (state)=>({bangumi:state.bangumi})
)(class Search extends React.Component{
    render(){
        var { bangumi } = this.props;
        console.log(bangumi);
        return (
            <div className="bangumi" id="bangumi">
                <p>番剧:{bangumi?bangumi.name:""}</p>
                <p>集数:{bangumi?bangumi.eps.length:""}</p>
                <p>概要:{bangumi?bangumi.summary:""}</p>
            </div>
        )
    }
})

export { Bangumi }