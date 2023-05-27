class Api::UsersController < ApplicationController

  # overriding automatic param nesting to include password to those params, 
  # because there is no such a table in user db, so auto params are not avaliable for password
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render json: { user: @user }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end

    
  end

  private 

  # strong params
  def user_params
    params.require(:user).permit(:email, :username, :password)
  end

end
