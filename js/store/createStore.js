import { createStore } from 'redux'

const store = createStore((state, action) => {
    switch (action.type) {
        case 'search':
            var result = state.result;
            var _result = action.result;
            return { result: _result }
            break;
        case 'active':
            var target = state.target;
            var _target = action.target;
            return { target: _target };
            break;
        default:
            return { state }
            break;
    }
});

export { store }