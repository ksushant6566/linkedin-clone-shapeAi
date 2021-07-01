import React, { forwardRef, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../context/auth';

// actions
import { deleteCommentStart } from '../../redux/Post/posts.actions';

// components
import InputOption from '../InputOption';
import { Avatar } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

// styles
import './index.css';

const Comment = forwardRef(({comment: { user: author, comment, _id }, postId}, ref) => {
  
  const dispatch = useDispatch()
  const { user } = useContext(AuthContext)

  const handleDeleteComment = () => {
    dispatch(deleteCommentStart({postId, commentId: _id }))
  }

  return (
    <div ref={ref} className="comment">
        <div className="comment_header">
          <Avatar src={author.image}></Avatar>
          <div className="commentInfo">
            <h2>{author.username}</h2>
            <p>{author.bio}</p>
          </div>
        </div>
        <div className="comment_body">
          <p>{comment}</p>
          {user._id == author._id &&
            <InputOption handleclick={handleDeleteComment} Icon={DeleteForever} title="Delete" color="gray" />
          }
        </div>
        <div className="post_buttons">
        </div>
    </div>
  );
});

export default Comment;