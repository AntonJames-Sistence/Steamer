class Api::ReviewsController < ApplicationController

    def create
        # generate new instance with strong params taken from user
        @review = Review.new(review_params)
        # take game_id from params in url
        @review.game_id = params[:game_id]
        # take author_id from current_user
        @review.author_id = current_user.id

        if @review.save!
            # render :show
            render json: { review: @review }, status: :ok
        else
            render json: { errors: @review.errors.full_messages }, status: :unauthorized
        end
    end


    private

    def review_params
        params.require(:review).permit(:body, :recommended)
    end

end
