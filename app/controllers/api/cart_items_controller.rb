class Api::CartItemsController < ApplicationController

    def index
        if current_user
            # nice selector only those games with user id // also N+1 query selector
            @cart_items = CartItem.includes(:game, :user).where(user_id: current_user.id)
            render :index
        else
            render json: { response: {} }
        end
    end

    def create
        @cart_item = CartItem.new(cart_item_params.merge(user_id: current_user.id))

        if @cart_item.save!
            # render json: { game: @cart_item.game }
            render :show
        else
            render json: { errors: ['Allready in cart'] }, status: :unprocessable_entity
        end
    end

    def destroy
        # by nature of table setup it will return array with only one element
        @cart_items = CartItem.includes(:game, :user).where(user_id: current_user.id, game_id: params[:id])
        @game = @cart_items[0]
        @game.destroy
    end

    def destroy_all
        CartItem.destroy_all
        render json: { message: 'Cart is empty' }
    end

    private 

    def cart_item_params
        params.require(:cart_item).permit(:game_id)
    end
end
