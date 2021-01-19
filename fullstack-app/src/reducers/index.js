import { combineReducers } from 'redux'

import { userReducer } from './userReducer'

const allReducer = combineReducers({
    user: userReducer
})

export default allReducer