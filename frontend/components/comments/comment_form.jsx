import React from 'react'
import { MdSort } from "react-icons/md";
import { FaUserCircle } from 'react-icons/fa'

class CommentForm extends React.Component {
    constructor(props) {
        debugger
        super(props)

        this.state = {
            body: "",
            videoId: this.props.match.params.videoId,
            clicked: false
        }

        this.handleComment = this.handleComment.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.totalComments = this.totalComments.bind(this)
    }

    handleComment(e) {
        e.preventDefault();
        const comment = Object.assign({}, this.state)
        debugger
        this.props.createComment(comment)
        .then(() => {
            this.setState({ body: "" })
        })
    }

    handleCancel(e) {
        e.preventDefault();
        this.setState({ clicked: false })
    }

    update(e) {
        debugger
        return e => {
            this.setState({ 
                body: e.currentTarget.value,
            })
        }
    }

    handleRedirect(e) {
        e.preventDefault();
        const { currentUser, history } = this.props
        if (!currentUser) {
            history.push("/login")
        } else {
            this.setState({ clicked: true })
        }
    }

    totalComments(comments) {
        debugger
        let commentsSum = comments.forEach(comment => {
            let sum = []
           if (!comment.child_comments) {
                sum.push(comment) 
            } else {
                while (comment.child_comments) {
                    comment.child_comments.forEach(child => {
                        sum.push(child)
                        this.totalComments(child.child_comments)
                    })
                }
            }
            console.log(sum.length)
            return sum.length
        });
        return commentsSum;
    }

    render() {
        debugger
        const { comments } = this.props
        console.log(this.state)
        return (
            <div className="comment-form-container">
                <div className="comment-form-info">
                    <div className="comment-length">
                        {this.totalComments(comments)}&nbsp;Comments
                    </div>
                    <div className="comment-sort">
                        <span><MdSort /></span>SORT BY
                    </div>
                </div>
                <form onSubmit={this.handleComment}>
                    <div className="comment-form">
                        <div className="profile-thumbnail-comment">
                            {this.props.currentUser ? <img src={this.props.currentUser.photoUrl} /> : <span><FaUserCircle /></span>}
                        </div>
                        {!this.state.clicked ? <input className="comment-form-input" type="text" placeholder="Add a public comment..." value={this.state.body} onChange={this.update("body")} onClick={this.handleRedirect} />
                        : <input className="comment-form-input-clicked" type="text" placeholder="Add a public comment..." value={this.state.body} onChange={this.update("body")} onClick={this.handleRedirect} />}
                    </div>
                    {this.state.clicked ?
                    <div className="comment-form-btns1">    
                        <button className="cancel-btn" onClick={this.handleCancel}>CANCEL</button>
                        {this.state.body.length > 0 ? <button className="comment-btn-typing" onClick={this.handleComment}>COMMENT</button> : <button className="comment-btn" onClick={this.handleComment}>COMMENT</button>}
                    </div> : null}
                </form>
            </div>
        )
    }
}

export default CommentForm;