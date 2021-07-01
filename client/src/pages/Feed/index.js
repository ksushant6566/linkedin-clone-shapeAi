import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { fetchPostsStart } from '../../redux/Post/posts.actions'

// components
import PostCard from '../../components/PostCard'


const mapState = ({ post }) => ({
    posts: post.posts
})

const Feed = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(mapState);

    useEffect(() => {
        dispatch(fetchPostsStart());
    }, []);

    return (
        <div>
            {
                posts && Array.isArray(posts) && posts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))
            }
        </div>
    );
};

export default Feed;