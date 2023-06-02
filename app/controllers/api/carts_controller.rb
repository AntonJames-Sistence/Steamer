class Api::CartsController < ApplicationController

    def index
        @cart_association = Cart.includes(:game, :user).where(user_id: current_user.id)
        render :index
    end

end
