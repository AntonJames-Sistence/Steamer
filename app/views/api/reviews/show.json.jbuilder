json.merge! @review.as_json(only: [:id, :body, :recommended, :created_at])
json.set! 'author' do
    json.extract! @review.author, :id, :email, :username
end
