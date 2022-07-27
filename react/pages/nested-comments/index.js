import { useState, createContext, useContext } from 'react';

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

const CommentsContext = createContext();

export const CommentsProvider = (props) => {
  const [comments, setComments] = useState(initialState);
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');

  const updateReply = (comments, ids) => {
    if (ids.length === 0) {
      return [...comments, reply];
    }

    comments[ids[0]].replies = updateReply(
      comments[ids[0]].replies,
      ids.slice(1)
    );

    return [...comments];
  };

  const handleCommentOnChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentAdition = () => {
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

  const handleReply = (ids) => () => {
    setComments(updateReply(comments, ids));
  };

  const providerValue = {
    comments,
    handleCommentOnChange,
    handleCommentAdition,
    handeReplyChange,
    handleReply,
  };

  return (
    <CommentsContext.Provider value={providerValue}>
      {props.children}
    </CommentsContext.Provider>
  );
};

/*
Comments Engine / Comment thread,

Develop a Comments Engine with the following features
- display a list of comments ✅
- add a new comment ✅
- reply to any existing comment (should support n-level Nested Replies to the comments) ✅
- delete a comment (All children comments are deleted if a parent is deleted)
- edit a comment, show edited flag on edited comments
*/

const RepliesBox = ({ ids, replies }) => {
  const { handeReplyChange, handleReply } = useContext(CommentsContext);

  return replies.map((reply, index) => {
    const indices = [...ids, index];

    return (
      <div
        key={reply.text}
        style={{
          border: '1px solid',
          padding: '8px',
          margin: '8px',
          margin: '8px 0',
        }}
      >
        <p style={{ marginTop: '8px', marginBottom: '8px' }}>
          {reply.author}: {reply.text}
        </p>
        {reply.edited ? (
          <p style={{ marginTop: '8px', marginBottom: '8px' }}>✅</p>
        ) : null}
        <RepliesBox ids={indices} replies={reply.replies} />
        <input style={{ marginRight: '4px' }} onChange={handeReplyChange} />
        <button onClick={handleReply(indices)}>add reply</button>
      </div>
    );
  });
};

const Comment = ({ text, author, edited, replies, ids }) => {
  const { handeReplyChange, handleReply } = useContext(CommentsContext);

  return (
    <div
      style={{ border: '1px solid', padding: '8px', margin: '8px' }}
      key={text}
    >
      <p style={{ marginTop: '8px', marginBottom: '8px' }}>
        {author}: {text}
      </p>
      {edited ? (
        <p style={{ marginTop: '8px', marginBottom: '8px' }}>✅</p>
      ) : null}
      <RepliesBox ids={ids} replies={replies} />
      <input style={{ marginRight: '4px' }} onChange={handeReplyChange} />
      <button onClick={handleReply(ids)}>add reply</button>
    </div>
  );
};

const Comments = () => {
  const { comments, handleCommentOnChange, handleCommentAdition } =
    useContext(CommentsContext);

  return (
    <>
      {comments.map((comment, index) => (
        <Comment
          text={comment.text}
          author={comment.author}
          edited={comment.edited}
          replies={comment.replies}
          ids={[index]}
        />
      ))}

      <div style={{ margin: '8px' }}>
        <input
          style={{ marginRight: '4px' }}
          onChange={handleCommentOnChange}
        />
        <button onClick={handleCommentAdition}>add comment</button>
      </div>
    </>
  );
};

const Page = () => (
  <CommentsProvider>
    <Comments />
  </CommentsProvider>
);

export default Page;
