json.merge! @game.as_json(only: [:id, :title, :genre, :details, :description, :release_date, :developer, :publisher, :price])
json.imageUrls @game.images.map { |image| url_for(image) }