import React from 'react'
import { connect } from 'react-redux'
import { dangumiSearch, myBangumiInfo, addBangumi, closeWindow } from '../script/index'

import {get } from 'http'
import fs from 'fs'
import { load } from 'cheerio'

const search_kw = "高校舰队";

const Head = connect()(class Head extends React.Component{
    searchKeyWord(){
        return search_kw;//sInput.value;
    }
    searchURL(){
        var keyword = encodeURI(this.searchKeyWord());
        var url = `http://bangumi.tv/subject_search/${keyword}?cat=2`;
        return url;
    }
    searchRequest(dispatch){
        var url = this.searchURL();
        get(url, function(res) {
            var html = "";
            var result = new Array();
            res.on("data", function(chunk) {
                html += chunk;
            })
            res.on("end", function() {
                fs.writeFile("./log.html", html, "utf8", function() {});
                var $ = load(html);
                var li = $("#browserItemList li");
                for (let i = 0; i < li.length; i++) {
                    let list = {};
                    list.img = li.find("a img")[i].attribs.src;
                    list.name = li.find("a")[i * 2 + 1].firstChild.data;
                    list.href = li.find("a")[i * 2 + 1].attribs.href;
                    result.push(list);
                }
                dispatch({type:"search",result:result})
            })
        });
    }
    render(){
        return (
            <div className="header">
                <span className="icon" id="tSearch" onClick={dangumiSearch}>
                    search
                    <input className="s-input" id="sInput" type="test" />
                    <button id="btn" onClick={this.searchRequest.bind(this,this.props.dispatch)}>搜</button>
                </span>
                <span className="icon" id="tMe" onClick={myBangumiInfo}>我的追番</span>
                <span className="icon" id="close" onClick={closeWindow}>×</span>
            </div>
        )
    }
})

export { Head }