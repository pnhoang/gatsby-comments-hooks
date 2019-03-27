import React, { useContext } from "react"
import CommentsContext from "../context/comments"

const Comments = () => {
  const { comment, comments, onChange, onSubmit } = useContext(CommentsContext)

  return (
    <div>
      <pre>{JSON.stringify(comments, null, 4)}</pre>
      <form onSubmit={onSubmit}>
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={onChange}
          style={{ display: "block" }}
        />

        <button type="submit">Add Comment</button>
      </form>

      <ul>
        {comments.map(comment => (
          <li key={comment}>
            <p>{comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
