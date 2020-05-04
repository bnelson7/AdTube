import { connect } from 'react-redux'
import { requestVideo, requestVideos } from '../../actions/video_actions'
import { requestComments } from '../../actions/comment_actions'
import VideoShow from './video_show'

const mSTP = (state, ownProps) => {
    debugger
    return {
        videoId: ownProps.match.params.videoId,
        video: state.entities.videos[ownProps.match.params.videoId],
        videos: Object.values(state.entities.videos),
        path: ownProps.location.pathname
    }
}

const mDTP = dispatch => ({
    requestVideo: id => dispatch(requestVideo(id)),
    requestVideos: () => dispatch(requestVideos()),
    requestComments: videoId => dispatch(requestComments(videoId))
})

export default connect(mSTP, mDTP)(VideoShow)