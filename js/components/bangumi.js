import React from 'react'
import { connect } from 'react-redux'

import { get } from 'http'
import { load } from 'cheerio'

const Bangumi = connect(
    (state)=>({bangumi:state.bangumi})
)(class Search extends React.Component{
    closed(){
        bangumiDetail.style.display = "none";
    }
    addBangumi(bangumi,dispatch){
        var addbangumi = bangumi;
        get(`http://bangumi.tv/${addbangumi.ephref}`,function(res){
            var html = "";
            res.on("data",function(chunk){
                html += chunk;
            })
            res.on("end",function(){
                var $ = load(html);
                var eps = $(".line_list a");
                addbangumi.eps = [];
                for(let i = 0;i<eps.length;i++){
                    let epinfo = /([a-z]*[0-9]+).(.*)/i.exec(eps[i].children[0].data);
                    let ep = epinfo[1];
                    let title = epinfo[2];
                    addbangumi.eps.push({ep:ep,title:title})
                }
                console.log(addbangumi)
                dispatch({type:"addbangumi",addbangumi:addbangumi});
            })
        })
    }
    render(){
        var { bangumi } = this.props;
        console.log(bangumi);
        return (
            <div className="bangumi" id="bangumiDetail">
                <div className="title">番剧:{bangumi?bangumi.name:""}</div>
                <a className="b-close" onClick={this.closed}>×</a>
                <div>
                    <img src={bangumi?`http:`+bangumi.img:""} alt={bangumi?bangumi.name:""} />
                    <button onClick={this.addBangumi.bind(this,bangumi,this.props.dispatch)}>add to list</button>
                    <article>{bangumi?bangumi.summary:""}</article>
                </div>
                <div className="bangumi-loading" id="bangumiLoading">loading</div>
            </div>
        )
    }
})

export { Bangumi }