import React from 'react'
import CommentFormContainer from './comment_form_container'
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

class CommentIndexItem extends React.Component {
    constructor(props) {
        debugger
        super(props)
        console.log(props)

        this.state = {
            body: this.props.comment.body,
            id: this.props.comment.id,
            videoId: this.props.videoId,
            edited: this.props.comment.edited,
            editing: false,
            replying: false,
            clicked: false,
            expanded: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleReply = this.handleReply.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.replying) {
            const editedComment = Object.assign({}, this.state)
            debugger
            this.props.editComment(editedComment)
            .then(() => {
                this.setState({
                    edited: this.props.comment.edited, 
                    editing: false
                })
            })
        } else {
            const reply = Object.assign({}, this.state)
            debugger
            this.props.createComment(reply)
            .then(() => {
                this.setState({
                  editing: false,
                  replying: false
                })
            })
        }
    }

    handleDelete() {
        this.props.deleteComment(this.props.comment.id)
    }

    handleEdit(e) {
        debugger
        e.preventDefault();
        this.setState({ 
            body: this.props.comment.body,
            editing: true,
            replying: false,
            clicked: true 
        })
    }

    handleCancel(e) {
        debugger
        e.preventDefault();
        this.setState({ 
            editing: false,
            replying: false,
            clicked: false
        })
    }

    handleReply() {
        this.setState({ 
            body: "",
            editing: false,
            replying: true,
            clicked: true
        })
    }

    update(e) {
        return e => {
            this.setState({ body: e.currentTarget.value })
        }
    }

    renderProfileThumbnail() {
        const { comment } = this.props
        {comment.parentCommentId ? 
        <div className="profile-thumbnail-comment-item">
            <img src={comment.author.photoUrl} />
        </div> :
        <div className="profile-thumbnail-reply-item">
            <img src={comment.author.photoUrl} />
        </div>}
    }

    renderEdit() {
        return (        
            this.state.editing && !this.state.replying ?
            <form onSubmit={this.handleSubmit}>
                <div className="comment-form">
                    {!this.state.clicked ? <input className="comment-form-input" type="text" value={this.state.body} onChange={this.update("body")} />
                    : <input className="comment-form-input-clicked" type="text" value={this.state.body} onChange={this.update("body")} />}
                </div>
                <div className="comment-form-btns1">
                    <button className="cancel-btn" onClick={this.handleCancel}>CANCEL</button>
                    {this.state.body.length > 0 ? <button className="comment-btn-typing" onClick={this.handleComment}>SAVE</button> : <button className="comment-btn" onClick={this.handleComment}>SAVE</button>}
                </div>
            </form> : null
        )
    }

    renderReply() {
        const { comment } = this.props
        return (
            !this.state.editing && this.state.replying ?
            <form onSubmit={this.handleSubmit}>
                <div className="comment-form">
                    <div className="profile-thumbnail-comment">
                        <img src={comment.author.photoUrl} />
                    </div>
                    {!this.state.clicked ? <input className="comment-form-input" type="text" value={this.state.body} onChange={this.update("body")} />
                    : <input className="comment-form-input-clicked" type="text" value={this.state.body} onChange={this.update("body")} />}
                </div>
                <div className="comment-form-btns1">
                    <button className="cancel-btn" onClick={this.handleCancel}>CANCEL</button>
                    {this.state.body.length > 0 ? <button className="comment-btn-typing" onClick={this.handleComment}>REPLY</button> : <button className="comment-btn" onClick={this.handleComment}>REPLY</button>}
                </div>
            </form> : null
        )
    }

    render() {
        const { comment } = this.props
        debugger
        console.log(this.state)
        return (
            <div className="comment-container">
                {<div className="profile-thumbnail-comment-item">
                    <img src={comment.author.photoUrl} />
                </div>}
                <div className="comment-info-container">
                    <div className="comment-info" >
                        <div>
                            <div className="comment-author-date">
                                {comment.author.username} {!this.state.edited ? <span>{comment.createdAt}</span> : <span>{comment.updatedAt}</span>} {this.state.edited ? <span>(edited)</span> : null}
                            </div>
                            <div className="comment-body" onClick={this.handleEdit}>
                                {!this.state.editing ? comment.body : null}
                            </div>
                        </div>
                        {this.renderEdit()}
                        <div className="comment-icons">
                            <div className="comment-icons-icons">
                                <span><IoMdThumbsUp /></span><span><IoMdThumbsDown /></span>
                            </div>
                            <button onClick={this.handleReply}>REPLY</button>
                        </div>
                        {comment.childComments ? 
                        <div className="replies-dropdown">
                            {this.state.expanded ? <FaCaretUp/> : <FaCaretDown/>} {comment.childComments.length === 1 ? <span>View reply</span> : <span>View {comment.childComments.length} replies</span>}
                        </div> : null}
                        {this.renderReply()}
                    </div>
                    {/* <div>
                        <button onClick={this.handleDelete}>delete</button>
                    </div> */}
                </div>
            </div>
        )
    }
 }

 export default CommentIndexItem;