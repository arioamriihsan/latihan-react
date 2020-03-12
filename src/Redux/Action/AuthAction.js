export const Login = (data) => {
    return{
        type: 'LOGIN',
        payload: data
    }
}

export const Logout = () => {
    return{
        type: 'LOGOUT'
    }
}

export const addToCart = (data) => {
    return{
        type: 'ADD_CART',
        payload: data
    }
}