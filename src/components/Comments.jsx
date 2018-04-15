import React from 'react';

function Comments (props) {
  if (props.thread === undefined) {
    return (
      <div className='comment'>
        <p>
          Did you rent this before or are you thinking
          about trying it out for a few days? Set the trend and post a comment!
        </p>
      </div>
    )
  } else {
    return (
      <div className='commentThread'>
        <h4>Comment thread</h4>
        {props.thread.map((comment) => {
          return (
            <div className='comment'>
              <p className='user'>{comment.user}</p>
              <p className='content'>{comment.text}</p>
            </div>
          )
        })
        }
      </div>
    )
  }
}

export default Comments;