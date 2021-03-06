import React from 'react'
import { connect } from 'react-redux'
import { remote } from "electron"
import { requireSearch } from '../script/requireSearch'

const Head = connect(
    (state)=>({target:state.target})
)(class Head extends React.Component{
    searchKeyWord(){
        return sInput.value;
    }
    searchURL(){
        const keyword = encodeURI(this.searchKeyWord());
        const url = `http://bangumi.tv/subject_search/${keyword}?cat=2`;
        return url;
    }
    searchRequest(dispatch){
        var url = this.searchURL();
        var page = 1;
        var result = new Array();
        loading.style.display = "block";

        requireSearch(url,page,searchlist,end);

        function searchlist(li){
            for (let i = 0; i < li.length; i++) {
                let list = {};
                list.id = "";
                list.name = li.find("a")[i * 2 + 1].firstChild.data;
                list.img = li.find("a img")[i]?li.find("a img")[i].attribs.src:"/";
                list.href = li.find("a")[i * 2 + 1].attribs.href;
                list.id = list.href.split("/")[2];
                result.push(list);
            }
        }
        function end(){
            loading.style.display = "none";
            dispatch({type:"search",result:result});
        }
    }
    dangumiSearch(dispatch){
        dispatch({type:"active",target:"tSearch"});
    }
    myBangumiInfo(dispatch){
        dispatch({type:"active",target:"tMe"});
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
        if(target == "tMe"){
            search.style.display = "none";
            tSearch.style.flexGrow = 1;
        }else if(target == "tSearch"){
            search.style.display = "block";
            tSearch.style.flexGrow = 6;
        }
        target = target?target:"tMe";
        return (
            <div className="header">
                <div className="drag"></div>
                <div className="face">
                    <span className={target=="tSearch"?"icon active":"icon"} id="tSearch" onClick={this.dangumiSearch.bind(this,this.props.dispatch)}>
                        {this.searchHTML(target)}
                    </span>
                    <span className={target=="tMe"?"icon active":"icon"} id="tMe" onClick={this.myBangumiInfo.bind(this,this.props.dispatch)}>我的追番</span>
                    <span className="icon" id="close" onClick={this.closeWindow}>×</span>
                </div>
            </div>
        )
    }
})

export { Head }