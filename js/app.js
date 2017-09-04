import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Head } from './components/head'
import { Search } from './components/search'
import { Bangumi } from './components/bangumi'
import { Me } from './components/me'
import { store } from './store/createStore'

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
    <Provider store={store}>
        <Bangumi />
    </Provider>,
    document.querySelector('app-bangumi')
)

ReactDOM.render(
    <Provider store={store}>
        <Me />
    </Provider>,
    document.querySelector('app-me')
)

ReactDOM.render(
    <div className="loading" id="loading"></div>,
    document.querySelector('app-loading')
)