import { createStore } from 'redux'

const store = createStore((state = {}, action) => {
    const result = state.result;
    const target = state.target;
    const bangumi = state.bangumi;
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
        default:
            return { state }
            break;
    }
});

export { store }