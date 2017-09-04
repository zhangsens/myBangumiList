import React from 'react'
import { connect } from 'react-redux'

import { get } from 'http'
import { load } from 'cheerio'

const Search = connect(
    (state) => ({list: state.result,bangumi:state.bangumi})
)(class Search extends React.Component{
    detail(i,dispatch){
        var bangumi = new Object();
        bangumi.id = this.props.list[i].href.split("/")[2];
        if(this.props.bangumi && bangumi.id == this.props.bangumi.id){
            bangumiDetail.style.display = "block";
        }else{
            bangumi.name = this.props.list[i].name;
            bangumi.img = this.props.list[i].img;
            var href = `http://bangumi.tv/${this.props.list[i].href}`;
            get(href,function(res){
                var html = "";
                res.on("data",function(chunk){
                    html += chunk;
                });
                res.on("end",function(){
                    var $ = load(html);
                    bangumi.summary = $("#subject_summary").text();
                    bangumi.eps = $(".prg_list li a");
                    bangumiDetail.style.display = "block";
                    dispatch({type:"detail",bangumi:bangumi});
                })
            }) 
        }
        
        //Promise(info).then(eps)
    }
    list(list){
        var html = [];
        var dispatch = this.props.dispatch;
        for(let i = 0;i<list.length;i++){
            html.push( <li key={i} className="list"><a onClick={this.detail.bind(this,i,dispatch)}><img className="list-img" src={list[i].img=="/"?``:`http:`+list[i].img} /><b>{list[i].name}</b></a></li> );
        }
        return html;
    }
    render(){
        const { list } = this.props;
        return (
            <div className="search" id="search">
                <ul>
                    <li className="list">result:</li>
                    { list ? this.list(list) : [<li key="0" className="list"><b>no result</b></li>] }
                </ul>
            </div>
        )
    }
})

export { Search }