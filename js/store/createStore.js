import { createStore } from 'redux'

const store = createStore((state, action) => {
    switch (action.type) {
        case 'search':
            var result = state.result;
            var _result = action.result;
            return { result: _result }
            break;
        default:
            return { state }
            break;
    }
});

export { store }