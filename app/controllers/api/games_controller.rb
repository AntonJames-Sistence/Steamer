class Api::GamesController < ApplicationController

    def show
        @game = Game.find_by(title: title)
        render :show
    end

end
