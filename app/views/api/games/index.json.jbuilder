# @games.each do |game|
#     json.set! game.id do
#         json.extract! game, :id, :title, :genre, :details, :description, :release_date, :developer, :publisher, :price
#     end   
# end

@games.each do |game|
    json.set! game.id do
        json.merge! (game.as_json(only: [:id, :title, :genre, :details, :description, :release_date, :developer, :publisher, :price]))
        json.imageUrls game.images.map { |image| url_for(image) }
    end
end

# json[:imageUrls] = game.images.map { |image| image.service_url }
# this could be an issue for not retrieving info from online