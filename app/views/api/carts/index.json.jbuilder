unless @cart_association.empty?
    # json.cart_items do
    #     @cart_association.each do |cart_item|
    #       json.set! cart_item.id do
    #         json.extract! cart_item,  :user_id, :game_id 
    #       end
    #     end
    # end

    # name of object
    json.games do
        # looping over users cart associated with games
        @cart_association.each do |cart_item|
            # each item will have name of game.id
          json.set! cart_item.game.id do
            # setting value to what it receives from another json builder
            json.partial! 'api/games/game', game: cart_item.game
          end
        end
    end

else
    # json.cart_items({})
    json.games({})
end

