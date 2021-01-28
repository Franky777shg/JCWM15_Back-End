import Axios from 'axios'

export const getCateDetail = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get('http://localhost:2000/cate/parentCate')

            console.log(res.data)

            dispatch({ type: 'GET_CATEGORY', payload: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const addCategory = (data) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('http://localhost:2000/cate/addCate', data)
            console.log(res.data)

            const res2 = await Axios.get('http://localhost:2000/cate/parentCate')

            console.log(res2.data)

            dispatch({ type: 'GET_CATEGORY', payload: res2.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const delCategory = (id) => {
    return async (dispatch) => {
        try {
            const res = await Axios.delete(`http://localhost:2000/cate/delCate/${id}`)
            console.log(res.data)

            const res2 = await Axios.get('http://localhost:2000/cate/parentCate')

            console.log(res2.data)

            dispatch({ type: 'GET_CATEGORY', payload: res2.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}