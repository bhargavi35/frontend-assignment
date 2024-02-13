import { useState } from 'react';

export default function CatComments() {
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <textarea placeholder="Add your comment..." />
      <button onClick={() => addComment('New comment')}>Add Comment</button>
    </div>
  );
}
