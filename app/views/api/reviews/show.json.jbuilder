json.merge! @review.as_json(only: [:id, :body, :recommended])
json.set! 'author' do
    json.extract! @review.author, :id, :email, :username
end
