import React from 'react'
import { connect } from 'react-redux'

const Search = connect(
    (state) => ({res: state.res})
)(class Search extends React.Component{
    render(){
        console.log(this.props);
        const {getData} = this.props;
        return (
            <div className="search" id="search">
                <div className="head"></div>
            </div>
        )
    }
})

export { Search }