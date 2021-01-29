import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { categoryReducer } from './categoryReducer'
import { productReducer } from './productReducer'

const allReducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    product: productReducer
})

export default allReducer