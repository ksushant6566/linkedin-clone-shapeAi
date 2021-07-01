import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { fetchPostStart } from '../../redux/Post/posts.actions';

import PostCard from '../../components/PostCard';
import Comment from '../../components/Comment';
import CreateComment from '../../components/CreateComment';

const mapState = ({ post }) => ({
    post: post.post
})

const Post = () => {
    const dispatch = useDispatch();

    const { postId } = useParams();
    const { post } = useSelector(mapState);

    useEffect(() => {
        dispatch(fetchPostStart(postId))
    }, [])

    if(Object.keys(post).length === 0) return null
    return (
        <>
            <PostCard post={post} />
            <CreateComment postId={post && post._id} />
            {post && post.comments && post.comments.length > 0 && (
                post.comments.map(comment => (
                    <Comment key={comment._id} postId={post._id} comment={comment} />
                ))
            )}
        </>
    )
}

export default Post;