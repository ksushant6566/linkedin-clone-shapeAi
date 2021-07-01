import React, { forwardRef, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

// actions
import { deletePostStart, likePostStart } from '../../redux/Post/posts.actions';

// components
import InputOption from '../InputOption';

import { Avatar } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { DeleteForever, ThumbUpAlt } from '@material-ui/icons';

// styles
import './index.css';

const PostCard = forwardRef(({post: { user: author, text, image, likes, comments, _id }}, ref) => {
  
  const history = useHistory()
  const dispatch = useDispatch()
  const { user } = useContext(AuthContext)

  const handleLike = () => {
    dispatch(likePostStart(_id))
  }

  const handleClickComment = () => {
    history.push(`post/${_id}`)
  }

  const getLikeColor = () => {
    return likes.some(like => like.user === user._id) ? 'blue' : 'gray'
  }

  const handleDeletePost = () => {
    dispatch(deletePostStart(_id))
    history.push(`/feed`)
  }

  return (
    <div ref={ref} className="post">
        <div className="post_header">
          <Avatar src={author.image}></Avatar>
          <div className="postInfo">
            <h2>{author.username}</h2>
            <p>{author.bio}</p>
          </div>
        </div>
        <div className="post_body">
          <p>{text}</p>
          <img src={image} />
        </div>
        <div className="post_analytics">
            <p>{likes.length} likes</p>
            <p>{comments.length} comments</p>
        </div>
        <div className="post_buttons">
          <InputOption handleclick={handleLike} Icon={ThumbUpAlt} title="Like" color={getLikeColor()} />
          <InputOption handleclick={handleClickComment} Icon={ChatOutlinedIcon} title="Comment" color="gray" />
          {user._id == author._id &&
            <InputOption handleclick={handleDeletePost} Icon={DeleteForever} title="Delete" color="gray" />
          }
        </div>
    </div>
  );
});

export default PostCard;