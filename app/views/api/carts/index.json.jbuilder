
@cart_items.each do |cart_item|
    json.set! cart_item.id do
        json.extract! cart_item, :user_id, :game_id
    end
end