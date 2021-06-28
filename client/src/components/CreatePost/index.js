import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AuthContext } from '../../context/auth'

// actions
import { addPostStart } from '../../redux/Post/posts.actions'

// components
import Modal from '../Modal'

// styles
import './index.css'

const CreatePost = () => {
    const { user } = useContext(AuthContext)
    const dispatch = useDispatch()


    const [hideModal, setHideModal] = useState(true);
    const [post, setPost] = useState({
        text: "",
        image: ""
    })

    const toggleHide = () => {
        setHideModal(s => !s)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(addPostStart(post))
        toggleHide()
        setPost({
            text: "",
            image: ""
        })
    }

    return (
        <div className="createPost">
            <div className="profile-img">
                <img src={user && user.img} alt={user && user.username} />
            </div>
            <button className="createPost-btn" onClick={() => toggleHide()}>
                Start a post
            </button>
            <Modal hideModal={hideModal} toggleHide={toggleHide} >
                <div className="createPost-head">
                    <h2 className="createPost-heading">
                        Create a post
                    </h2>
                    <button className="createPost-btn-close" onClick={() => toggleHide()}>
                        X
                    </button>
                </div>
                <div className="createPost-userProfile">
                    <div className="profile-img">
                        <img src={user && user.img} alt={user && user.username} />
                    </div>
                    <h3>{user && user.username}</h3>
                </div>
                <form className="createPost-form" onSubmit={handleSubmit}>
                    <textarea
                        className="post-text"
                        type="text"
                        name="text"
                        value={post.text}
                        placeholder="What do you want to talk about?"
                        onChange={handleChange}
                    />
                    <input
                        className="post-image"
                        type="url"
                        name="image"
                        value={post.image}
                        placeholder="Type in the image url"
                        onChange={handleChange}
                    />
                    <div>
                        <button className="submit-button" type="submit">
                            Post
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default CreatePost