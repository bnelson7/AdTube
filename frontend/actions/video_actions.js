import * as VideoAPIUtil from '../util/video_api_util'

export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'

const receiveVideos = videos => ({
    type: RECEIVE_VIDEOS,
    videos 
})

export const requestVideos = () => dispatch => (
    VideoAPIUtil.fetchVideos()
    .then(videos => dispatch(receiveVideos(videos)))
)