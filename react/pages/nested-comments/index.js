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

const RepliesBox = ({ commentIndex, replies }) =>
  replies.map((reply) => (
    <div key={reply.text}>
      <p>{reply.text}</p>
      <p>{reply.author}</p>
      <p>{reply.edited}</p>
      <RepliesBox replies={reply.replies} />
    </div>
  ));

const NextedComments = () => {
  const [comments, setComments] = React.useState([
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
  ]);
  const [comment, setComment] = React.useState('');
  const [reply, setReply] = React.useState('');

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
      {comments.map((comment, index) => {
        return (
          <div key={comment.text}>
            <p>{comment.text}</p>
            <p>{comment.author}</p>
            <p>{comment.edited}</p>
            <RepliesBox commentIndex={index} replies={comment.replies} />
            <input onChange={handeReplyChange} />
            <button onClick={handleReply(index)}>add reply</button>
          </div>
        );
      })}

      <input onChange={handleCommentOnChange} />
      <button onClick={handleCommentAdition}>add comment</button>
    </div>
  );
};

export default NextedComments;
