import React from 'react'
import { connect } from 'react-redux'

const Bangumi = connect(
    (state)=>({bangumi:state.bangumi})
)(class Search extends React.Component{
    closed(){
        bangumiDetail.style.display = "none";
    }
    render(){
        var { bangumi } = this.props;
        return (
            <div className="bangumi" id="bangumiDetail">
                <a className="b-close" onClick={this.closed}>×</a>
                <p>番剧:{bangumi?bangumi.name:""}</p>
                <p>集数:{bangumi?bangumi.eps.length:""}</p>
                <p>概要:{bangumi?bangumi.summary:""}</p>
            </div>
        )
    }
})

export { Bangumi }