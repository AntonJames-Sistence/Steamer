class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user # not sure why do we need this
      render json: { user: current_user }
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])

    if @user
      login!(@user)
      render json: { user: @user }
    else
      render json: { errors: ['Invalid credentials'] }, status: :unauthorized
    end
  end

  def destroy
    logout! if current_user
    render json: { message: 'success' }
  end
end
