import { useState } from 'react';

/*
Comments Engine / Comment thread,

Develop a Comments Engine with the following features
- display a list of comments
- add a new comment
- reply to any existing comment (should support n-level Nested Replies to the comments)
- delete a comment (All children comments are deleted if a parent is deleted)
- edit a comment, show edited flag on edited comments

[
    {
        text: '',
        author: ''
        edited: boolean
        replies: [
            {
                text: '',
                author: ''
                edited: boolean
                replies: [
                    {
                        text: 'this text',  // setComment
                        author: ''
                        edited: boolean
                        replies: []
                    }
                ]
            },
            {
                text: '',
                author: ''
                edited: boolean
                replies: []
            }
        ]
    }
]
*/

const initialState = [
  {
    text: 'testing',
    author: 'TK',
    edited: false,
    replies: [
      {
        text: 'reply',
        author: 'TK',
        edited: false,
        replies: [
          {
            text: 'nested reply',
            author: 'TK',
            edited: false,
            replies: [],
          },
        ],
      },
    ],
  },
];

const RepliesBox = ({ commentIndex, replies }) =>
  replies.map((reply) => (
    <div key={reply.text} style={{ margin: '8px 0', paddingLeft: '16px' }}>
      <p style={{ marginTop: '8px', marginBottom: '8px' }}>{reply.text}</p>
      <p style={{ marginTop: '8px', marginBottom: '8px' }}>{reply.author}</p>
      {reply.edited ? (
        <p style={{ marginTop: '8px', marginBottom: '8px' }}>✅</p>
      ) : null}
      <RepliesBox replies={reply.replies} />
    </div>
  ));

const Comment = ({
  text,
  author,
  edited,
  replies,
  handeReplyChange,
  handleReply,
  index,
}) => (
  <div
    style={{ border: '1px solid', padding: '8px', margin: '8px' }}
    key={text}
  >
    <p style={{ marginTop: '8px', marginBottom: '8px' }}>{text}</p>
    <p style={{ marginTop: '8px', marginBottom: '8px' }}>{author}</p>
    {edited ? (
      <p style={{ marginTop: '8px', marginBottom: '8px' }}>✅</p>
    ) : null}
    <RepliesBox commentIndex={index} replies={replies} />
    <input style={{ marginRight: '4px' }} onChange={handeReplyChange} />
    <button onClick={handleReply(index)}>add reply</button>
  </div>
);

const Comments = () => {
  const [comments, setComments] = useState(initialState);
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');

  const handleCommentOnChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentAdition = (event) => {
    setComments([
      ...comments,
      { text: comment, author: 'TK', edited: false, replies: [] },
    ]);
  };

  const handeReplyChange = (event) => {
    setReply({
      text: event.target.value,
      author: 'TK',
      edited: false,
      replies: [],
    });
  };

  const handleReply = (index) => () => {
    setComments(
      comments.map((comment, id) => {
        if (index === id) {
          return {
            ...comment,
            replies: [...comment.replies, reply],
          };
        }

        return comment;
      })
    );
  };

  return (
    <div className="app">
      {comments.map((comment, index) => (
        <Comment
          text={comment.text}
          author={comment.author}
          edited={comment.edited}
          replies={comment.replies}
          handeReplyChange={handeReplyChange}
          handleReply={handleReply}
          index={index}
        />
      ))}

      <div style={{ margin: '8px' }}>
        <input
          style={{ marginRight: '4px' }}
          onChange={handleCommentOnChange}
        />
        <button onClick={handleCommentAdition}>add comment</button>
      </div>
    </div>
  );
};

export default Comments;
