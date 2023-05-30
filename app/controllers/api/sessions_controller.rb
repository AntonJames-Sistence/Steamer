class Api::SessionsController < ApplicationController

  # current user show
  def show
    if current_user
      @user = current_user 
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  # session login
  def create
    @user = User.find_by_credentials(params[:credential], params[:password])

    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['Please check your password and account name and try again.'] }, status: :unauthorized
    end
  end

  # session logout
  def destroy
    logout! if current_user
    render json: { message: 'success' }
  end

end
