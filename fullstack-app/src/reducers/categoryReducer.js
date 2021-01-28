const INITIAL_STATE = {
    detail: []
}

export const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_CATEGORY':
            return {
                detail: action.payload
            }
        default:
            return state
    }
}