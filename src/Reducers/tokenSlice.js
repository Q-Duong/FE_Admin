const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''

const initialState = token


const tokenSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TOKEN': {
            localStorage.setItem('token',action.payload)
           return action.payload
           
        }
        case 'REMOVE_TOKEN': {
            localStorage.setItem('token','')
            return ''
         }
        default: return state
    }
}
export default tokenSlice