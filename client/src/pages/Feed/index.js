import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { fetchPostsStart } from '../../redux/Post/posts.actions';

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
            Feed
        </div>
    );
};

export default Feed;