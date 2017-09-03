import React from 'react'
import { connect } from 'react-redux'

const Search = connect(
    (state) => ({list: state.result})
)(class Search extends React.Component{
    list(list){
        var html = [];
        for(let i = 0;i<list.length;i++){
            html.push( <li key={i} className="list"><img className="list-img" src={`http:`+list[i].img} /><b>{list[i].name}</b></li> );
        }
        return html
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