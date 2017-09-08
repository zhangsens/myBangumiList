import { createStore } from 'redux'

var upload = 0;

const store = createStore((state = {}, action) => {
    const result = state.result;
    const target = state.target;
    const bangumi = state.bangumi;
    const reload = state.reload;
    switch (action.type) {
        case 'search':
            const _result = action.result;
            return { result: _result, target: target, bangumi: bangumi }
            break;
        case 'active':
            const _target = action.target;
            return { result: result, target: _target, bangumi: bangumi };
            break;
        case 'detail':
            const _bangumi = action.bangumi;
            return { result: result, target: target, bangumi: _bangumi }
            break;
        case 'addbangumi':
            const __target = action.target;
            const __bangumi = action.bangumi;
            return { result: result, target: __target, bangumi: __bangumi }
            break;
        case 'upload':
            const _reload = ++upload;
            return { result: result, target: target, bangumi: bangumi, reload: _reload }
            break;
        default:
            return { state }
            break;
    }
});

export { store }