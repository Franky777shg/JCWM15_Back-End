import Axios from 'axios'

export const getProduct = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get('http://localhost:2000/product/getProduct')

            dispatch({ type: 'GET_PRODUCT', payload: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const addProduct = (data) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('http://localhost:2000/product/addProduct', data)

            dispatch({ type: "GET_PRODUCT", payload: res.data})
        }
        catch (err) {
            console.log(err)
        }
    }
}