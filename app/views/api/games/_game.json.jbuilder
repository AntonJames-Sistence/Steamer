# json.extract! game, :id, :title, :genre, :details, :description, :release_date, :developer, :publisher, :price
# json.imageUrls game.images.map { |image| image.url }
# json.photoUrl post.photo.attached? ? post.photo.url : nil

json.merge! game.as_json(only: [:id, :title, :genre, :details, :description, :release_date, :developer, :publisher, :price])
json.imageUrls game.images.map { |image| url_for(image) }