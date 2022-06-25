const token = localStorage.getItem('token') !== null ? localStorage.getItem('token') : null

const initialState = {
    value: token,
}


const tokenSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'addToken': {
            localStorage.setItem('token',action.payload)
           return state.value = action.payload
           
        }
        case 'romoveToken': {
            localStorage.setItem('token',null)
            return state.value = null
         }
        default: return state
    }
}

export default tokenSlice