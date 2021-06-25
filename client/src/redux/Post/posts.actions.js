import postTypes  from "./posts.types";

export const addPostStart = postData => ({
    type: postTypes.ADD_NEW_POST_START,
    payload: postData
});

export const fetchPostsStart = (filters={}) => ({
    type: postTypes.FETCH_POSTS_START,
    payload: filters
})

export const setPosts = posts => ({
    type: postTypes.SET_POSTS,
    payload: posts,
})

export const deletePostStart = postID => ({
    type: postTypes.DELETE_POST_START,
    payload: postID
})

export const fetchPostStart = postID => ({
    type: postTypes.FETCH_POST_START,
    payload: postID,
})

export const setPost = post => ({
    type: postTypes.SET_POST,
    payload: post
})
