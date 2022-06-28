const token = localStorage.getItem('token') !== null ? localStorage.getItem('token') : null

const initialState = {
    value: token,
}


const tokenSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TOKEN': {
            localStorage.setItem('token',action.payload)
           return action.payload
           
        }
        case 'REMOVE_TOKEN': {
            localStorage.remove('token')
            return null
         }
        default: return state
    }
}
export default tokenSlice