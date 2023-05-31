@games.each do |game|
    json.set! game.id do
        json.extract! game, :id, :title, :genre, :details, :description, :release_date, :developer, :publisher, :price
    end   
end