import { AxiosInstance } from "../../utils/axios";

export const handleAddPost = async post => {
    try {
        return await AxiosInstance.post('posts', post);
    } catch (error) {
        console.log(error.response.data.err)
    }
}

export const handleFetchPosts = async () => {
    try {
        const { data } = await AxiosInstance.get('posts');
        return data;
    } catch (error) {
        console.log(error.response.data.err)
    }
}

export const handleLikePost = async postId => {
    try {
        const { data } = await AxiosInstance.post(`posts/like/${postId}`);
        return data;
    } catch (error) {
        console.log(error.response.data.err)
    }
}

export const handleFetchPost = async postId => {
    try {
        const { data } = await AxiosInstance.get(`posts/${postId}`);
        return data;
    } catch (error) {
        console.log(error.response.data.err)
    }
}

export const handleAddComment = async ({ postId, comment }) => {
    try {
        const { data } = await AxiosInstance.post(`posts/comment/${postId}`, { comment: comment });
        return data;
    } catch (error) {
        console.log(error.response.data.err)   
    }
}

export const handleDeletePost = async postId => {
    try {
        console.log("delete comment")
        await AxiosInstance.delete(`posts/${postId}`); 
    } catch (error) {
        console.log(error.response.data.err)   
    }
}

export const handleDeleteComment = async ({postId, commentId}) => {
    try {
        const { data } = await AxiosInstance.delete(`posts/comment/${postId}/${commentId}`)
        return data;
    } catch (error) {
        console.log(error.response.data.err)  
    }
}