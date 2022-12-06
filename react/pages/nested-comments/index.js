/*
Comments Engine / Comment thread,

Develop a Comments Engine with the following features
- display a list of comments ✅
- add a new comment ✅
- reply to any existing comment (should support n-level Nested Replies to the comments) ✅
- delete a comment (All children comments are deleted if a parent is deleted) ✅
- edit a comment, show edited flag on edited comments
- as an author X, I can create my own comment/reply: it should show the authors name
*/

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

  const addNewReply = (comments, ids) => {
    if (ids.length === 0) {
      return [...comments, reply];
    }

    const id = ids.shift();
    comments[id].replies = addNewReply(comments[id].replies, ids);
    return [...comments];
  };

  const removeReply = (comments, ids, index) => {
    if (ids.length === 0) {
      return comments.filter((_, id) => id !== index);
    }

    const id = ids.shift();
    comments[id].replies = removeReply(comments[id].replies, ids, index);
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

  const handleCommentDeletion = (index) => () => {
    setComments(comments.filter((_, id) => id !== index));
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
    setComments(addNewReply(comments, ids));
  };

  const handleReplyDeletion = (ids, index) => () => {
    setComments(removeReply(comments, ids, index));
  };

  const providerValue = {
    comments,
    handleCommentOnChange,
    handleCommentAdition,
    handeReplyChange,
    handleReply,
    handleCommentDeletion,
    handleReplyDeletion,
  };

  return (
    <CommentsContext.Provider value={providerValue}>
      {props.children}
    </CommentsContext.Provider>
  );
};

const Replies = ({ ids, replies }) => {
  const { handeReplyChange, handleReply, handleReplyDeletion } =
    useContext(CommentsContext);

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
        <div style={{ display: 'flex', gap: '8px' }}>
          <p style={{ marginTop: '8px', marginBottom: '8px' }}>
            {reply.author}: {reply.text}
          </p>
          <button onClick={handleReplyDeletion(ids, index)}>X</button>
        </div>
        {reply.edited ? (
          <p style={{ marginTop: '8px', marginBottom: '8px' }}>✅</p>
        ) : null}
        <Replies ids={indices} replies={reply.replies} />
        <input style={{ marginRight: '4px' }} onChange={handeReplyChange} />
        <button onClick={handleReply(indices)}>add reply</button>
      </div>
    );
  });
};

const Comment = ({ text, author, edited, replies, index, ids }) => {
  const { handeReplyChange, handleReply, handleCommentDeletion } =
    useContext(CommentsContext);

  return (
    <div
      style={{ border: '1px solid', padding: '8px', margin: '8px' }}
      key={text}
    >
      <div style={{ display: 'flex', gap: '8px' }}>
        <p style={{ marginTop: '8px', marginBottom: '8px' }}>
          {author}: {text}
        </p>
        <button onClick={handleCommentDeletion(index)}>X</button>
      </div>
      {edited ? (
        <p style={{ marginTop: '8px', marginBottom: '8px' }}>✅</p>
      ) : null}
      <Replies ids={ids} replies={replies} />
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
          index={index}
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
