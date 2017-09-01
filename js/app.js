import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Head } from './components/head'
import { Search } from './components/search'
import { Bangumi } from './components/bangumi'
import { Me } from './components/me'

var res=0;
var store=createStore((state={res:res},action)=>{
    const res = state.res;
    switch(action.type){
        case 'search':
            var keyword = sInput.value;
            const res = state.res;
            return  { res: res + 1 }
            break;
        default:
            return { state }
            break;
    }
});

ReactDOM.render(
    <Provider store={store}>
        <Head />
    </Provider>,
    document.querySelector('app-head')
)

ReactDOM.render(
    <Provider store={store}>
        <Search />
    </Provider>,
    document.querySelector('app-search')
)

ReactDOM.render(
    <Bangumi></Bangumi>,
    document.querySelector('app-bangumi')
)

ReactDOM.render(
    <Me />,
    document.querySelector('app-me')
)