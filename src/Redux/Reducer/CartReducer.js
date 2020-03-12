const INNITIAL_STATE = {
    id : '',
    name : '',
    size : '',
    category : '',
    price : '', 
    image : '',
    isCart : false
}

export const CartReducer = (state = INNITIAL_STATE, action) => {
    switch(action.type) {
        case 'ADD_CART' :
            return{
                // ...state,
                id : action.payload.id,
                name : action.payload.name,
                size : action.payload.size,
                category : action.payload.category,
                price : action.payload.price,
                image : action.payload.image,
                isCart : true
            }
    default :
        return state
    }
}