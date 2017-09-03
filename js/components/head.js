import React from 'react'
import { connect } from 'react-redux'
import { addBangumi } from '../script/index'
import { remote } from "electron"

import {get } from 'http'
import fs from 'fs'
import { load } from 'cheerio'

const search_kw = "高校舰队";

const Head = connect(
    (state)=>({target:state.target})
)(class Head extends React.Component{
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
    dangumiSearch(dispatch){
        dispatch({type:"active",target:"tSearch"});
        search.style.display = "block";
        //sInput.style.display = "inline-block";
        //btn.style.display = "inline-block";
        bangumi.style.display = "none";
        tSearch.style.flexGrow = 6;
    }
    myBangumiInfo(dispatch){
        dispatch({type:"active",target:"tMe"});
        search.style.display = "none";
        //sInput.style.display = "none";
        //btn.style.display = "none";
        bangumi.style.display = "none";
        tSearch.style.flexGrow = 1;
    }
    closeWindow(){
        remote.getCurrentWindow().close();
    }
    searchHTML(target){
        var html = [];
        if(target=="tSearch"){
            html[0] = <input key="sInput" className="s-input" id="sInput" type="test" />;
            html[1] = <button key="btn" id="btn" onClick={this.searchRequest.bind(this,this.props.dispatch)}>搜</button>;
        }else{
            html.push("search");
        }
        return html;
    }
    render(){
        var { target } = this.props;
        target = target?target:"tMe";
        return (
            <div className="header">
                <span className={target=="tSearch"?"icon active":"icon"} id="tSearch" onClick={this.dangumiSearch.bind(this,this.props.dispatch)}>
                    {this.searchHTML(target)}
                </span>
                <span className={target=="tMe"?"icon active":"icon"} id="tMe" onClick={this.myBangumiInfo.bind(this,this.props.dispatch)}>我的追番</span>
                <span className="icon" id="close" onClick={this.closeWindow}>×</span>
            </div>
        )
    }
})

export { Head }