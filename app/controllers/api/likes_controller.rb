class Api::LikesController < ApplicationController

    def create
        @like = Like.create(liker_id: current_user.id, likeable_type: params[:like][:likeableType], likeable_id: params[:like][:likeableId], liked: params[:like][:liked], disliked: params[:like][:disliked])
        
        debugger
        if @like.likeable_type == 'Video'
            debugger
            render :show
        elsif @like.likeable_type == 'Comment'
            render :show
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    def destroy
        @like.find_by(id: params[:id])
        @like.destroy
    end

    def like_params
        params.require(:like).permit(:liker_id, :likeable_id, :likeable_type)
    end
end