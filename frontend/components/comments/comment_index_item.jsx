import React from 'react'
import CommentFormContainer from './comment_form_container'

class CommentIndexItem extends React.Component {
    constructor(props) {
        debugger
        super(props)

        this.state = {
            body: this.props.comment.body,
            id: this.props.comment.id,
            edited: false,
            editing: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleSubmit() {
        const editedComment = Object.assign({}, this.state)
        debugger
        this.props.editComment(editedComment)
        .then(() => {
            this.setState({
                edited: true, 
                editing: false 
            })
        })
    }

    handleDelete() {
        this.props.deleteComment()
    }

    handleEdit(e) {
        this.setState({ editing: true })
    }

    handleCancel(e) {
        this.setState({ editing: false})
    }

    update(e) {
        return e => {
            this.setState({ body: e.currentTarget.value })
        }
    }

    render() {
        debugger
        const { comment } = this.props
        console.log(this.state)
        return (
            <div>
                <div>
                    <div onClick={this.handleEdit}>
                        {this.props.comment.body} {this.state.edited ? <span>(edited)</span> : null}
                    </div>
                    {this.state.editing ?
                    <form onSubmit={this.handleSubmit}>
                        <div className="comment-form">
                            <div className="profile-thumbnail-comment">
                                <img src={comment.author.photoUrl} />
                            </div>
                            <input type="text" value={this.state.body} onChange={this.update("body")}/>
                        </div>
                        <div className="comment-form-btns1">
                            <button className="cancel-btn" onClick={this.handleCancel}>CANCEL</button>
                            <button className="comment-btn" onClick={this.handleSubmit}>SAVE</button>
                        </div>
                    </form> : null}
                </div>
            </div>
        )
    }
 }

 export default CommentIndexItem;