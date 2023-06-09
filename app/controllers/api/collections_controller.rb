class Api::CollectionsController < ApplicationController

    def index
        if current_user
            # nice selector only those games with user id // also N+1 query selector
            @collection_items = Collection.includes(:game, :user).where(user_id: current_user.id)
            # render :index
        else
            render json: { response: {} }
        end
    end

    def create
        @collection_item = Collection.new(collection_item_params.merge(user_id: current_user.id))

        if @collection_item.save!
            render json: { game: @collection_item.game }
        else
            render json: { errors: ['Allready in collection'] }, status: :unprocessable_entity
        end
    end

    private

    def collection_item_params
        params.require(:collection_item).permit(:game_id)
    end

end
