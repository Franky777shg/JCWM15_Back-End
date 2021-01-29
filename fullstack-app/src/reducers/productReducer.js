const INITIAL_STATE = {
    data: []
}

export const productReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case 'GET_PRODUCT':
            return {
                data: action.payload
            }
        default:
            return state
    }
}