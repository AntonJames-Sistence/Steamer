class Api::ReviewsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        @reviews = Review.includes(:author).where(game_id: params[:game_id])
        render 'api/reviews/index'
    end

    def create
        # generate new instance with strong params taken from user
        @review = Review.new(review_params)
        # take game_id from params in url
        @review.game_id = params[:game_id]
        # take author_id from current_user
        @review.author_id = current_user.id

        if @review.save!
            render 'api/reviews/show'
        else
            render json: { errors: @review.errors.full_messages }, status: :unauthorized
        end
    end

    def update
        @review = Review.find(params[:id])
        @review.assign_attributes(review_params)
        
        if @review.save!
            render 'api/reviews/show'
        else
            render json: { errors: @review.errors.full_messages }, status: :unauthorized
        end
    end

    def destroy
        @review = Review.find(params[:id])
        @review.destroy
    end


    private

    def review_params
        params.require(:review).permit(:body, :recommended)
    end

end
