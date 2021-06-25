import { takeLatest, put, all, call } from 'redux-saga/effects';
import postTypes from './posts.types';
import { setPost, setPosts, fetchPostStart, fetchPostsStart, deletePostStart, addPostStart } from './posts.actions'
import { handleAddPost, handleFetchPosts } from './posts.helper';



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
        console.log(posts);
        yield put(
            setPosts(posts)
        );
    } catch (error) {
        console.log(error)
    }
}

export function* onFetchPostsStart() {
    yield takeLatest(postTypes.FETCH_POSTS_START, fetchPosts)
}

// export function* deletePost({ payload }) {
//     try {
//         yield handleDeletePost(payload);
//         yield put(
//             fetchPostsStart()
//         );
//     } catch (error) {
//         console.log(error);
//     }
// }

// export function* onDeletePostStart() {
//     yield takeLatest(postTypes.DELETE_POST_START, deletePost)
// }

// export function* fetchPost({ payload }) {
//     try {
//         const post = yield handleFetchPost(payload);
//         yield put(
//             setPost(post)
//         )

//     } catch (error) {
//         console.log(error)
//     }
// }

// export function* onFetchPostStart() {
//     yield takeLatest(postTypes.FETCH_POST_START, fetchPost)
// }

export default function* postSagas() {
    yield all([
        call(onAddPostStart),
        call(onFetchPostsStart),
        // call(onDeletePostStart),
        // call(onFetchPostStart),
    ])
}