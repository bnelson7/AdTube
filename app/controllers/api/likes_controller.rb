class Api::LikesController < ApplicationController

    def create
        @like = Like.create(liker_id: current_user.channels.first.id, 
        likeable_type: params[:like][:likeableType], 
        likeable_id: params[:like][:likeableId], 
        liked: params[:like][:liked], 
        disliked: params[:like][:disliked])
        
        if @like
            render :show
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    def destroy
        @like = Like.find_by(id: params[:id])
        @like.destroy
        render :show
    end

    def like_params
        params.require(:like).permit(:liker_id, :likeable_id, :likeable_type)
    end
end
