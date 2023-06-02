class Api::CartsController < ApplicationController

    def index
        @cart_items = Cart.includes(:game, :user).where(user_id: current_user.id)
        render :index
    end

end
