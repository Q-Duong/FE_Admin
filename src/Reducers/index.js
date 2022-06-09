import activeTableReducer from './activeTableReducers'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    activeTable: activeTableReducer,
})

export default rootReducer