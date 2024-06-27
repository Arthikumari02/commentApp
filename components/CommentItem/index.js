import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleLike, deleteComment} = props
  const {id, name, comment, isLike, time, backgroundColorClass} = commentDetails

  const likeImgUrl = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLike = () => {
    toggleLike(id)
  }

  const onClickDelete = () => {
    deleteComment(id)
  }

  return (
    <li className={`comment-item ${backgroundColorClass}`}>
      <div className="comment-header">
        <p className="comment-author">{name}</p>
        <p className="comment-time">{time} ago</p>
      </div>
      <p className="comment-text">{comment}</p>
      <div className="comment-footer">
        <button type="button" className="like-button" onClick={onClickLike}>
          <img src={likeImgUrl} alt="like" className="like-icon" />
        </button>
        <button
          type="button"
          className="delete-button"
          data-testid="delete"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
