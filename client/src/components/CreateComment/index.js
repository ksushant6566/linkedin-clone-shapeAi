import React, { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'

import { AuthContext } from '../../context/auth'

import { addCommentStart } from '../../redux/Post/posts.actions'

import { Input } from '@material-ui/core'

import './index.css'

const CreateComment = ({ postId }) => {
    const [comment, setComment] = useState('')
    const { user } = useContext(AuthContext)

    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addCommentStart({
            postId,
            comment
        }))
        setComment('')
    }

    return (
        <div className="createComment">
            <div className="profile-img">
                <img src={user && user.img} alt={user && user.username} />
            </div>
            <form className="createComment-form" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Add a comment"
                    className="createPost-btn"
                />
                {comment.length > 0 && <button className="submit-button" type="submit">
                        Post
                    </button>}
            </form>
        </div>
    )
}

export default CreateComment