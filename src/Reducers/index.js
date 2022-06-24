import activeTableReducer from './activeTableReducers'
import tokenReducer from './tokenSlice'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    activeTable: activeTableReducer,
    token: tokenReducer,
})

export default rootReducer