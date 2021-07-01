import React, { forwardRef } from 'react';

import { Avatar } from '@material-ui/core';
// import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
// import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
// import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
// import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

// styles
import './index.css';

const Comment = forwardRef(({comment: { user: author, comment }}, ref) => {

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
        </div>
    </div>
  );
});

export default Comment;