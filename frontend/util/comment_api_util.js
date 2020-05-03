export const fetchComments = (videoId) => {
    debugger
    return (
        $.ajax({
            url: `/api/videos/${videoId}/comments`,
            method: 'GET'
        })
    )
}

export const fetchComment = (id) => {
    return (
        $.ajax({
            url: `/api/comments/${id}`,
            method: 'GET'
        })
    )
}

export const createComment = comment => {
    debugger
    return (
        $.ajax({
            url: `/api/videos/${comment.videoId}/comments`,
            method: 'POST',
            data: { comment } 
        })
    )
}

export const updateComment = (comment) => {
    debugger
    return (
        $.ajax({
            url: `/api/comments/${comment.id}`,
            method: 'PATCH',
            data: { comment }
        })
    )
}

export const deleteComment = (id) => {
    debugger
    return (
        $.ajax({
            url: `/api/comments/${id}`,
            method: 'DELETE'
        })
    )
}