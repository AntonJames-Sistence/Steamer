class Api::SearchController < ApplicationController

    def index
        
        # Retrieve the search query from the URL parameters
        if params[:category] == 'All'
            query = params[:category]
            @results = Game.all
        elsif params[:category]
            query = params[:category]
            @results = Game.where('genre ILIKE ?', "%#{query}%")
        elsif params[:query]
            query = params[:query]
            @results = Game.where('title ILIKE ?', "%#{query}%")
        end

        if query == ''
            render json: []
        else
            
            result_array = @results.map do |result|
                result_data = result.as_json(only: [:id, :title, :genre, :details, :description, :release_date, :developer, :publisher, :price])
                image_urls = result.images.map { |image| url_for(image) }
                result_data.merge(imageUrls: image_urls)
            end
            
            render json: result_array
        end
        
    end

end
