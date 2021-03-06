import { connect } from 'react-redux'
import { requestVideos, deleteVideo } from '../../actions/video_actions'
import VideoIndex from './video_index'
import { withRouter } from 'react-router-dom'

const mSTP = (state, ownProps) => {

    return {
        videos: Object.values(state.entities.videos),
        path: ownProps.location.pathname
    }
}

const mDTP = dispatch => {
    
    return ({
        requestVideos: () => dispatch(requestVideos()),
        deleteVideo: videoId => dispatch(deleteVideo(videoId))
    })
}

export default withRouter(connect(mSTP, mDTP)(VideoIndex))