export const login = (data) => {
    return {
        type: 'LOG_IN',
        payload: data
    }
}

export const logout = () => {
    return {
        type: 'LOG_OUT'
    }
}