const initState = 1
// list: [{product, main, sub, quantity, image}],
// total_price: 0
// seller

const activeTableReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_ACTIVE_TABLE': {
           return action.payload
        }
        default: return state
    }
}

export default activeTableReducer