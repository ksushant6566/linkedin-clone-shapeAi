import postTypes from './posts.types';

const INITIAL_STATE = {
    posts: [],
    post: {},
}

const postReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case postTypes.SET_PRODUCTS:
            return {
                ...state,
                posts: action.payload
            }
        
        case postTypes.SET_PRODUCT: 
        return {
            ...state,
            post: action.payload
        }
    
        default:
            return state
    }
}

export default postReducer;