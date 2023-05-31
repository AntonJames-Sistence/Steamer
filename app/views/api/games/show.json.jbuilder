json.game do
    json.extract! @game, :id, :title, :genre, :details, :description, :release_date, :developer, :publisher, :price
end