# Nested Comments

## Comments Engine / Comment thread

- display a list of comments
- add a new comment
- reply to any existing comment (should support n-level Nested Replies to the comments)

## Design & Implementation

- Map to render a list of comments
- Comment component: UI of the comment
- Replies component: list of replies for a given component
- Input and button to handle new comment
- Input and button to handle new reply
- Context API + `useState` to handle state
- Replies render Replies: recursion to render nested replies
- Recursion to add new replies
