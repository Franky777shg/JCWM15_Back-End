import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { categoryReducer } from './categoryReducer'

const allReducer = combineReducers({
    user: userReducer,
    category: categoryReducer
})

export default allReducer