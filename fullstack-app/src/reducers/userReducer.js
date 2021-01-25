let INITIAL_STATE = {
    id_users: null,
    username: '',
    password: '',
    email: '',
    gender: '',
    kota: '',
    umur: null,
    profile_pic: '',
    regStatus: null,
    errLogin: ''

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
                regStatus: action.payload.status,
                gender: action.payload.gender,
                kota: action.payload.kota,
                umur: action.payload.umur,
                profile_pic: action.payload.profile_pic,
            }
        case 'LOG_OUT':
            return INITIAL_STATE
        case 'VERIFICATION':
            return {
                ...state,
                regStatus: 1
            }
        case 'LOGIN_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        default:
            return state
    }
}