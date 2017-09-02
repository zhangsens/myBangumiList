import React from 'react'
import { connect } from 'react-redux'

const Search = connect(
    (state) => ({list: state.result})
)(class Search extends React.Component{
    list(list){
        var html = [];
        for(let i = 0;i<list.length;i++){
            html.push( <div key={i} className="list">{list[i].name}</div> );
        }
        return html
    }
    render(){
        const { list } = this.props;
        return (
            <div className="search" id="search">
                <li className="list"></li>
                { list ? this.list(list) : "" }
            </div>
        )
    }
})

export { Search }