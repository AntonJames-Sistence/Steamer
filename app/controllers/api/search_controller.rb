class Api::SearchController < ApplicationController

    def index
        query = params[:query] # Retrieve the search query from the URL parameters
       
        if params[:query] == ''
            render json: []
        else
            @results = Game.where('title ILIKE ?', "%#{query}%")

            result_array = @results.map do |result|
                result_data = result.as_json(only: [:id, :title, :genre, :details, :description, :release_date, :developer, :publisher, :price])
                image_urls = result.images.map { |image| url_for(image) }
                result_data.merge(imageUrls: image_urls)
            end
              
            render json: result_array
        end
    end

end
