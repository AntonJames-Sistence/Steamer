class Api::CartItemsController < ApplicationController

    def index
        # nice selector only those games with user id // also N+1 query selector
        @cart_items = CartItem.includes(:game, :user).where(user_id: current_user.id)
        render :index
    end

    def create
        @cart_item = CartItem.new(cart_item_params.merge(user_id: current_user.id))

        render json: @cart_item
    end

    def destroy
        @association = CartItem.find_by(id: params[:id])
    end

    private 

    def cart_item_params
        params.require(:cart_item).permit(:game_id)
    end
end
