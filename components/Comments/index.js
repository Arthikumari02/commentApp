import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLike: false,
      time: formatDistanceToNow(new Date()),
      backgroundColorClass:
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random() * initialContainerBackgroundClassNames.length,
          )
        ],
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  toggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLike: !eachComment.isLike}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredComments = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: filteredComments})
  }

  render() {
    const {commentsList, name, comment} = this.state

    return (
      <div className="comments-container">
        <h1 className="heading">Comments</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
          alt="comments"
          className="comments-image"
        />
        <p>Say Something</p>
        <p className="comments-count">{commentsList.length}</p>
        <form className="form-container" onSubmit={this.onAddComment}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={this.onChangeName}
            className="input"
          />
          <textarea
            rows="6"
            placeholder="Your Comment"
            value={comment}
            onChange={this.onChangeComment}
            className="textarea"
          />
          <button type="submit" className="add-button">
            Add Comment
          </button>
        </form>
        <ul className="comments-list">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              toggleLike={this.toggleLike}
              deleteComment={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
