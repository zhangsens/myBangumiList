import React from 'react'
import ReactDOM from 'react-dom'
import { returnIndex, myBangumiInfo, addBangumi, closeWindow } from './index'

ReactDOM.render(
    <div className="header">
        <span className="icon">前进</span>
        <span className="icon">后退</span>
        <span className="icon" onClick={returnIndex}>bangumi</span>
        <span className="icon" onClick={addBangumi}>+</span>
        <span className="icon" onClick={myBangumiInfo}>我的追番</span>
        <span className="icon" onClick={closeWindow}>X</span>
    </div>,
    document.querySelector('app-head')
)

ReactDOM.render(
    <div></div>,
    document.querySelector('app-search')
)

ReactDOM.render(
    <div className="bangumiInfo" id="bangumiInfo"></div>,
    document.querySelector('app-bangumi')
)

ReactDOM.render(
    <div className="me" id="me"></div>,
    document.querySelector('app-me')
)