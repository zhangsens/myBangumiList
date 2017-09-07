import React from 'react'
import { connect } from 'react-redux'

import { get } from 'http'
import { load } from 'cheerio'

const Search = connect(
    (state) => ({list: state.result,bangumi:state.bangumi})
)(class Search extends React.Component{
    detail(i,dispatch){
        const bangumi = this.props.list[i];
        bangumiDetail.style.display = "block";
        bangumiLoading.style.display = "block";
        if(this.props.bangumi && bangumi.id == this.props.bangumi.id){
            bangumiLoading.style.display = "none";
        }else{
            const href = `http://bangumi.tv/${bangumi.href}`;
            get(href,function(res){
                var html = "";
                res.on("data",function(chunk){
                    html += chunk;
                });
                res.on("end",function(){
                    var $ = load(html.toString('utf-8'));
                    bangumi.summary = $("#subject_summary").text();
                    bangumi.ephref = `${bangumi.href}/ep`;
                    bangumi.epsum = $(".prg_list li a").length;
                    bangumi.eplist = [];
                    bangumi.looked = 0;
                    bangumiLoading.style.display = "none";
                    dispatch({type:"detail",bangumi:bangumi});
                })
            }).on("error",function(err){
                console.log(err);
            })
        }
    }
    list(list){
        const html = [];
        const dispatch = this.props.dispatch;
        for(let i = 0;i<list.length;i++){
            html.push( <li key={list[i].id} className="list"><a onClick={this.detail.bind(this,i,dispatch)}><img className="list-img" src={list[i].img=="/"?``:`http:`+list[i].img} /><b>{list[i].name}</b></a></li> );
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