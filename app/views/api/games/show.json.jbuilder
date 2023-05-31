json.set! @game.id do
    json.extract! @game, :id, :title, :genre, :details, :description, :release_date, :developer, :publisher, :price
end
# json.set! @game.id do
#     json.partial! 'game', game: @game
# end