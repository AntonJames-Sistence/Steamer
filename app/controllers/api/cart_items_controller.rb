class Api::CartItemsController < ApplicationController

    def index
        # nice selector only those games with user id // also N+1 query selector
        @cart_items = CartItem.includes(:game, :user).where(user_id: current_user.id)
        render :index
    end

    def create
        @association = CartItem.new(:cart_params);

        # render :post ???
    end

    def destroy
        @association = CartItem.find_by(id: params[:id])
    end

    private 

    def cart_params
        params.require(:cart).permit(:user_id, :game_id)
    end
end
