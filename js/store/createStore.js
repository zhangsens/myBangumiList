import { createStore } from 'redux'

const store = createStore((state = {}, action) => {
    var result = state.result;
    var target = state.target;
    var bangumi = state.bangumi;
    switch (action.type) {
        case 'search':
            var _result = action.result;
            return { result: _result, target: target, bangumi: bangumi }
            break;
        case 'active':
            var _target = action.target;
            return { result: result, target: _target, bangumi: bangumi };
            break;
        case 'detail':
            var _bangumi = action.bangumi;
            return { result: result, target: target, bangumi: _bangumi }
            break;
        case 'addbangumi':
            var _addbangumi = action.addbangumi;
            break;
        default:
            return { state }
            break;
    }
});

export { store }