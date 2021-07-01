import postTypes from './posts.types';

const INITIAL_STATE = {
    posts: [],
    post: {},
}

const postReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case postTypes.SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        
        case postTypes.SET_POST: 
            return {
                ...state,
                post: action.payload
            }

        case postTypes.UPDATE_ONE_POST:
            const updatedPosts = state.posts.map(post => {
                return post._id === action.payload._id ? action.payload : post
            })
            console.log(updatedPosts)
            return {
                ...state,
                posts: updatedPosts
            }
    
        default:
            return state
    }
}

export default postReducer;