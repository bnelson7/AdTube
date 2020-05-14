import React from 'react'
import { FaCamera } from 'react-icons/fa'
import { MdSearch } from 'react-icons/md'
import ProfilePhotoContainer from './user_profile_photo_container'
import VideoIndexItem from '../videos/video_index_item'
import { MdFlag } from 'react-icons/md'
import CommentFormContainer from '../comments/comment_form_container'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            description: "",
            clipFile: null,
            thumbnailFile: null,
            selected: "home",
            edit: false,
            videoId: null
        }
  
        this.handleUpload = this.handleUpload.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.getDate = this.getDate.bind(this)
    }

    componentDidMount() {
        this.props.requestVideos()
    }

    handleUpload(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.files[0]})
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        
        if (!this.state.edit) {
            formData.append('video[title]', this.state.title);
            formData.append('video[description]', this.state.description);
            formData.append('video[clip]', this.state.clipFile);
            formData.append('video[thumbnail]', this.state.thumbnailFile);
            this.props.createVideo(formData) 
        } else {
            formData.append('video[title]', this.state.title);
            formData.append('video[description]', this.state.description);
            
            this.props.updateVideo(formData, this.state.videoId)
        }
    }

    handleEdit(video) {
        this.setState({ 
            title: video.title,
            description: video.description,
            selected: "home",
            clipFile: video.clipUrl,
            thumbnailFile: video.thumbnailUrl,
            edit: true,
            videoId: video.id
        })
    }

    handleDelete(videoId) {
        e.preventDefault();
        this.props.deleteVideo(videoId)
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        } 
    }

    handleToggle(e) {
        e.preventDefault();
        const nextSelected = document.getElementById(e.target.id)
        const prevSelected = document.querySelector(".selected-profile-nav-item")

        prevSelected.classList.remove("selected-profile-nav-item")
        prevSelected.classList.add("profile-nav-item")
        nextSelected.classList.remove("profile-nav-item")
        nextSelected.classList.add("selected-profile-nav-item")

        this.setState({ selected: e.target.id })
    }

    getDate() {
        const { currentUser } = this.props
        let date = new Date(`${currentUser.createdAt}`)
        let month = date.getMonth()
        let day = date.getDate()
        let year = date.getFullYear()
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        let uploadDateformatted = new Date(year, month, day)
        const newDateTimeFormat = Intl.DateTimeFormat('en-US', options)
        return newDateTimeFormat.format(uploadDateformatted)
    }

    renderSelected() {
        const { selected } = this.state
        const { videos, currentUser } = this.props
        
        switch (selected) {
            case "videos":
                return (
                    <div className="profile-videos">
                        <h1>Uploads</h1>
                        {videos.filter(video => video.creatorId === currentUser.id).map(video => {
                            
                            return (
                                <li className="grid-item"><VideoIndexItem key={video.id} video={video} />
                                    <button onClick={() => this.handleDelete(video.id)}>delete video</button>
                                    <button onClick={() => this.handleEdit(video)}>edit video</button>
                                </li>
                                )
                            }
                        )}
                    </div>
                )
            case "playlists":
                return (
                    <div className="profile-playlists">
                        <h1>This channel has no playlists.</h1>
                    </div>
                )
            case "channels":
                return (
                    <div className="profile-channels">
                        <h1>This channel doesn't feature any other channels.</h1>
                    </div>
                )
            case "discussion":
                return (
                    <div className="profile-comment-form-container">
                        <CommentFormContainer />
                    </div>
                )
            case "about":
                return (
                    <ul className="profile-about">
                        <li>Stats</li>
                        <li>Joined {this.getDate()}</li>
                        <li><MdFlag /></li>
                    </ul>
                )
            case "search":
                return (
                    <div className="profile-search">

                    </div>
                )
            default:
                return (
                    <div className="upload-container">
                        <img src="https://www.gstatic.com/youtube/img/channels/empty_channel_illustration.svg" />
                        <h1>Upload a video to get started</h1>
                        <p>Start sharing your story and connecting with viewers. Videos you upload will</p>
                        <p>show up here.</p>
                        <br />
                        <form onSubmit={this.handleSubmit}>
                            <div className="upload-form">
                                <label> Title:
                                        <input type="text" value={this.state.title} onChange={this.update('title')} />
                                </label>

                                <label> Desciption:
                                        <textarea value={this.state.description} onChange={this.update('description')} />
                                </label>

                                <input type="file" name="file1" id="file1" className="file1" onChange={this.handleUpload('clipFile')} />
                                <label htmlFor="file1">UPLOAD VIDEO</label>

                                <br />
                                <h1>Thumbnail</h1>
                                <p>Upload a picture that shows what's in your video. A good thumbnail stands out
                                    <br></br>and draws viewers' attention.</p>

                                <input type="file" name="file2" id="file2" className="file2" onChange={this.handleUpload('thumbnailFile')} />
                                <label htmlFor="file2">Upload thumbnail</label>
                                <br />
                                {!this.state.edit ? <button className="upload-btn">UPLOAD VIDEO</button> : <button className="upload-btn">SAVE</button>}
                            </div>
                        </form>
                    </div>
                )
        }
    }

    render() {
        return (
            <div className="profile-background">
                <div className="profile-header-container">
                    <div className="profile-header">
                    <ProfilePhotoContainer />
                    <div className="profile-nav">
                        <button onClick={this.handleToggle} className="selected-profile-nav-item" id="home">
                            HOME
                        </button>
                        <button onClick={this.handleToggle} className="profile-nav-item" id="videos">
                            VIDEOS
                        </button>
                        <button onClick={this.handleToggle} className="profile-nav-item" id="playlists">
                            PLAYLISTS
                        </button>
                        <button onClick={this.handleToggle} className="profile-nav-item" id="channels">
                            CHANNELS
                        </button>
                        <button onClick={this.handleToggle} className="profile-nav-item" id="discussion">
                            DISCUSSION
                        </button>
                        <button onClick={this.handleToggle} className="profile-nav-item" id="about">
                            ABOUT
                        </button>
                        <button onClick={this.handleToggle} className="profile-nav-item" id="search">
                            <MdSearch className="profile-search-icon"/>
                        </button>
                    </div>
                    </div>
                </div>
                <div className="profile-container">
                    {this.renderSelected()}
                </div>
            </div>
        )
    }
}

export default UserProfile