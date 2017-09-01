import React from 'react'
import { connect } from 'react-redux'
import { dangumiSearch, myBangumiInfo, addBangumi, closeWindow } from '../script/index'

const Head = connect(
    (state) => ({res: state.res}),
    (dispatch)=>{return {
        searchVideo: () => dispatch({type:"search"})
    }}
)(class Head extends React.Component{
    render(){
        const { searchVideo } = this.props;
        return (
            <div className="header">
                <span className="icon" id="tSearch" onClick={dangumiSearch}>
                    search
                    <input className="s-input" id="sInput" type="test" />
                    <button id="btn" onClick={searchVideo}></button>
                </span>
                <span className="icon" id="tMe" onClick={myBangumiInfo}>我的追番</span>
                <span className="icon" id="close" onClick={closeWindow}>×</span>
            </div>
        )
    }
})

export { Head }