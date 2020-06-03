json.partial! "api/users/user", user: @user

json.uploads do
    json.array! @user.uploads do |upload|
        json.partial! 'api/videos/video', video: upload
        json.clipUrl url_for(upload.clip)
        json.created_at time_ago_in_words(upload.created_at)
        json.updated_at time_ago_in_words(upload.updated_at)
    end
end

json.comments @user.comments, partial: 'api/comments/comment', as: :comment

json.liked do
    @user.video_likes.each do |like|
        json.videos do
            json.set! like.likeable_id do
                json.partial! 'api/likes/like', like: like
            end
        end
    end

    @user.comment_likes.each do |like|
        json.comments do
            json.set! like.likeable_id do
                json.partial! 'api/likes/like', like: like
            end
        end
    end
 end


 