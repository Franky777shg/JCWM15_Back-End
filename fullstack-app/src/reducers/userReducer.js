let INITIAL_STATE = {
    id_users: null,
    username: '',
    password: '',
    email: '',
    regStatus: null
    
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                id_users: action.payload.id_users,
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email,
                regStatus: action.payload.status
            }
        case 'LOG_OUT':
            return INITIAL_STATE
        case 'VERIFICATION':
            return{
                ...state,
                regStatus: 1
            }
        default:
            return state
    }
}