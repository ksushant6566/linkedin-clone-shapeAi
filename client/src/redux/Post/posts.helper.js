import { AxiosInstance } from "../../utils/axios";

export const handleAddPost = async post => {
    try {
        return await AxiosInstance.post('post', post);
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