import { takeLatest, put, all, call } from 'redux-saga/effects';
import postTypes from './posts.types';
import { 
    setPost, 
    setPosts, 
    updateOnePost, 
    fetchPostStart, 
    fetchPostsStart, 
    deletePostStart, 
    addPostStart 
} from './posts.actions'

import { 
    handleAddPost, 
    handleFetchPosts, 
    handleLikePost, 
    handleFetchPost, 
    handleAddComment, 
    handleDeletePost,
    handleDeleteComment
} from './posts.helper';



export function* addPost({ payload }) {
    try {
        yield handleAddPost({
            ...payload,
        })

        yield put(
            fetchPostsStart()
        )

    } catch (error) {
        console.log(error)
    }
}

export function* onAddPostStart() {
    yield takeLatest(postTypes.ADD_NEW_POST_START, addPost)
}

export function* fetchPosts({ payload }) {
    try {
        const posts = yield handleFetchPosts( payload );
        yield put(
            setPosts(posts.reverse())
        );
        yield put(
            setPost({})
        );
    } catch (error) {
        console.log(error)
    }
}

export function* onFetchPostsStart() {
    yield takeLatest(postTypes.FETCH_POSTS_START, fetchPosts)
}

export function* likePost({ payload }) {
    try {
        const post = yield handleLikePost( payload );

        yield put(
            updateOnePost(post)
            // fetchPostStart()
        );
        yield put(
            fetchPostStart(payload)
        );
    } catch (error) {
        console.log(error)
    }
}

export function* onLikePostStart() {
    yield takeLatest(postTypes.LIKE_POST_START, likePost)
}

export function* addComment({ payload }) {
    try {
        const post = yield handleAddComment( payload );

        yield put(
            updateOnePost(post)
        );
        yield put(
            fetchPostStart(payload.postId)
        );
    } catch (error) {
        console.log(error)
    }
}

export function* onAddCommentStart() {
    yield takeLatest(postTypes.ADD_COMMENT_START, addComment)
}

export function* deletePost({ payload }) {
    try {
        yield handleDeletePost(payload);
        yield put(
            fetchPostsStart()
        );
    } catch (error) {
        console.log(error);
    }
}

export function* onDeletePostStart() {
    yield takeLatest(postTypes.DELETE_POST_START, deletePost)
}

export function* deleteComment({ payload }) {
    try {
        const post = yield handleDeleteComment(payload);
        yield put(
            setPost(post)
        );
        yield put(
            updateOnePost(post)
        );
    } catch (error) {
        console.log(error);
    }
}

export function* onDeleteCommentStart() {
    yield takeLatest(postTypes.DELETE_COMMENT_START, deleteComment)
}

export function* fetchPost({ payload }) {
    try {
        const post = yield handleFetchPost(payload);
        yield put(
            setPost(post)
        )

    } catch (error) {
        console.log(error)
    }
}

export function* onFetchPostStart() {
    yield takeLatest(postTypes.FETCH_POST_START, fetchPost)
}

export default function* postSagas() {
    yield all([
        call(onAddPostStart),
        call(onFetchPostsStart),
        call(onLikePostStart),
        call(onDeletePostStart),
        call(onFetchPostStart),
        call(onAddCommentStart),
        call(onDeleteCommentStart)
    ])
}