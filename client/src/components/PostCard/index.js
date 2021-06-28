import React from 'react'
import { AxiosInstance } from '../../utils/axios'

const PostCard = ({ post }) => {

    return (
        <div className="postCard">
            <h1>{post.text}</h1>
        </div>
    )
}

export default PostCard